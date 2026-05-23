import dns from "node:dns/promises";
import fs from "node:fs/promises";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "public");
const screenshotDir = path.join(publicDir, "generated", "screenshots");
const port = Number(process.env.PORT || 3000);
const braveSearchApiKey = process.env.BRAVE_SEARCH_API_KEY || "";
const tavilyApiKey = process.env.TAVILY_API_KEY || "";

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(express.static(publicDir));

function isPrivateAddress(address) {
  if (net.isIP(address) === 4) {
    const parts = address.split(".").map(Number);
    return (
      parts[0] === 10 ||
      parts[0] === 127 ||
      (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
      (parts[0] === 192 && parts[1] === 168) ||
      (parts[0] === 169 && parts[1] === 254) ||
      parts[0] === 0
    );
  }

  if (net.isIP(address) === 6) {
    const normalized = address.toLowerCase();
    return normalized === "::1" || normalized.startsWith("fc") || normalized.startsWith("fd") || normalized.startsWith("fe80");
  }

  return true;
}

async function validatePublicUrl(rawUrl) {
  let parsed;
  try {
    parsed = new URL(rawUrl);
  } catch {
    throw new Error("Некорректный URL");
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("Поддерживаются только http и https ссылки");
  }

  const records = await dns.lookup(parsed.hostname, { all: true, verbatim: true });
  if (!records.length || records.some((record) => isPrivateAddress(record.address))) {
    throw new Error("Этот адрес нельзя скриншотить с сервера");
  }

  return parsed.toString();
}

async function captureReference(rawUrl) {
  let browser;
  const targetUrl = await validatePublicUrl(rawUrl);
  await fs.mkdir(screenshotDir, { recursive: true });

  browser = await chromium.launch({
    headless: true,
    args: ["--disable-dev-shm-usage"],
  });
  try {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1100 },
      deviceScaleFactor: 1,
    });

    await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 25000 });
    await page.waitForLoadState("networkidle", { timeout: 6000 }).catch(() => {});

    const title = (await page.title()).trim() || new URL(targetUrl).hostname;
    const filename = `reference-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.png`;
    const outputPath = path.join(screenshotDir, filename);
    await page.screenshot({ path: outputPath, fullPage: false });

    return {
      title,
      url: targetUrl,
      source: new URL(targetUrl).hostname.replace(/^www\./, ""),
      preview: `/generated/screenshots/${filename}`,
    };
  } finally {
    if (browser) await browser.close();
  }
}

function stripSearchText(value = "") {
  return String(value)
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function inferDesignTags(text) {
  const haystack = text.toLowerCase();
  const tagRules = [
    ["typography", ["typography", "type", "serif", "editorial", "magazine"]],
    ["layout", ["layout", "grid", "composition", "portfolio"]],
    ["photo", ["photo", "photography", "image", "visual", "gallery"]],
    ["materials", ["material", "stone", "wood", "texture", "tactile"]],
    ["proof", ["case study", "process", "service", "studio", "agency"]],
    ["minimal", ["minimal", "clean", "quiet", "simple"]],
    ["premium-service", ["premium", "luxury", "high-end", "boutique"]],
  ];
  const tags = tagRules.filter(([, words]) => words.some((word) => haystack.includes(word))).map(([tag]) => tag);
  return [...new Set(tags.length ? tags : ["search", "reference"])];
}

function scoreReferenceResult(item) {
  const url = item.url.toLowerCase();
  const hostname = new URL(item.url).hostname.replace(/^www\./, "");
  const text = `${item.title} ${item.description}`.toLowerCase();
  const badDomains = [
    "instagram.com",
    "facebook.com",
    "pinterest.com",
    "youtube.com",
    "x.com",
    "twitter.com",
    "themeforest.net",
    "templatemag.com",
    "webflow.com",
    "wix.com",
    "squarespace.com",
  ];
  const badUrlParts = [
    "/blog",
    "/article",
    "/articles",
    "/news",
    "/magazine",
    "/websites/",
    "/inspiration",
    "/best-",
    "/top-",
    "/template",
    "/templates",
    "/theme",
    "/themes",
  ];
  const badTextParts = [
    "best ",
    "top ",
    "inspiration",
    "examples",
    "collection",
    "curated",
    "article",
    "blog",
    "awards",
    "template",
    "theme",
    "builder",
    "wordpress",
    "download",
    "free ",
  ];
  const goodTextParts = ["studio", "portfolio", "projects", "work", "homepage", "architecture", "interior", "hospitality", "brand"];
  let score = Number(item.score || 0);

  if (badDomains.some((domain) => hostname === domain || hostname.endsWith(`.${domain}`))) score -= 1.5;
  badUrlParts.forEach((part) => {
    if (url.includes(part)) score -= 0.35;
  });
  badTextParts.forEach((part) => {
    if (text.includes(part)) score -= 0.18;
  });
  goodTextParts.forEach((part) => {
    if (text.includes(part)) score += 0.08;
  });

  return score;
}

function rankReferenceResults(results, count) {
  return results
    .map((item) => ({ ...item, referenceScore: scoreReferenceResult(item) }))
    .sort((a, b) => b.referenceScore - a.referenceScore)
    .filter((item) => item.referenceScore > -0.75)
    .slice(0, count);
}

async function braveSearch(query, count) {
  if (!braveSearchApiKey) {
    throw new Error("BRAVE_SEARCH_API_KEY не настроен на сервере");
  }

  const url = new URL("https://api.search.brave.com/res/v1/web/search");
  url.searchParams.set("q", query);
  url.searchParams.set("count", String(Math.min(Math.max(count, 1), 10)));
  url.searchParams.set("text_decorations", "false");
  url.searchParams.set("safesearch", "moderate");

  const response = await fetch(url, {
    headers: {
      "Accept": "application/json",
      "X-Subscription-Token": braveSearchApiKey,
    },
  });
  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result?.error?.detail || result?.message || "Поиск не ответил");
  }

  return rankReferenceResults((result.web?.results || [])
    .map((item) => ({
      title: stripSearchText(item.title),
      url: item.url,
      description: stripSearchText(item.description),
    }))
    .filter((item) => item.url), count);
}

async function tavilySearch(query, count) {
  if (!tavilyApiKey) {
    throw new Error("TAVILY_API_KEY не настроен на сервере");
  }

  const response = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${tavilyApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      search_depth: "basic",
      topic: "general",
      max_results: Math.min(Math.max(count, 1), 10),
      include_answer: false,
      include_raw_content: false,
      include_images: false,
    }),
  });
  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result?.detail?.error || result?.detail || result?.error || result?.message || "Tavily не ответил");
  }

  return rankReferenceResults((result.results || [])
    .map((item) => ({
      title: stripSearchText(item.title),
      url: item.url,
      description: stripSearchText(item.content),
      score: item.score,
    }))
    .filter((item) => item.url), count);
}

async function searchProvider(query, count) {
  if (tavilyApiKey) return tavilySearch(query, count);
  if (!braveSearchApiKey) {
    throw new Error("TAVILY_API_KEY не настроен на сервере");
  }
  return braveSearch(query, count);
}

app.post("/api/screenshot-reference", async (req, res) => {
  try {
    res.json(await captureReference(req.body?.url));
  } catch (error) {
    res.status(400).json({ error: error.message || "Не удалось сделать screenshot" });
  }
});

app.post("/api/screenshot-batch", async (req, res) => {
  const urls = Array.isArray(req.body?.urls) ? req.body.urls.slice(0, 20) : [];
  const results = [];

  for (const url of urls) {
    try {
      results.push({ ok: true, ...(await captureReference(url)) });
    } catch (error) {
      results.push({ ok: false, url, error: error.message || "Не удалось сделать screenshot" });
    }
  }

  res.json({ results });
});

app.post("/api/search-references", async (req, res) => {
  try {
    const query = stripSearchText(req.body?.query);
    const count = Number(req.body?.count || 8);
    if (!query || query.length < 3) {
      throw new Error("Введите поисковый запрос");
    }

    const searchResults = await searchProvider(query, count);
    const results = [];

    for (const result of searchResults) {
      try {
        const screenshot = await captureReference(result.url);
        const textForTags = `${query} ${result.title} ${result.description} ${screenshot.title}`;
        results.push({
          ok: true,
          title: screenshot.title || result.title,
          url: screenshot.url,
          source: screenshot.source,
          preview: screenshot.preview,
          description: result.description,
          tags: inferDesignTags(textForTags),
        });
      } catch (error) {
        results.push({
          ok: false,
          title: result.title,
          url: result.url,
          description: result.description,
          error: error.message || "Не удалось сделать screenshot",
        });
      }
    }

    res.json({ query, results });
  } catch (error) {
    res.status(400).json({ error: error.message || "Не удалось найти референсы" });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.listen(port, () => {
  console.log(`Noway MVP listening on ${port}`);
});
