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
const openrouterApiKey = process.env.OPENROUTER_API_KEY || "";
const openrouterBriefModel = process.env.OPENROUTER_BRIEF_MODEL || "nvidia/nemotron-nano-9b-v2:free";
const openrouterFallbackModel = process.env.OPENROUTER_FALLBACK_MODEL || "openrouter/free";

const searchSources = {
  behance: {
    label: "Behance",
    domains: ["behance.net"],
    queryHint: "site:behance.net/gallery website design landing page homepage",
    acceptPath: (pathname) => pathname.startsWith("/gallery/"),
  },
  dribbble: {
    label: "Dribbble",
    domains: ["dribbble.com"],
    queryHint: "site:dribbble.com/shots website design landing page homepage",
    acceptPath: (pathname) => pathname.startsWith("/shots/"),
  },
  pinterest: {
    label: "Pinterest",
    domains: ["pinterest.com"],
    queryHint: "site:pinterest.com/pin website design moodboard homepage",
    acceptPath: (pathname) => pathname.startsWith("/pin/"),
  },
  awwwards: {
    label: "Awwwards",
    domains: ["awwwards.com"],
    queryHint: "site:awwwards.com/sites website design",
    acceptPath: (pathname) => /^\/sites\/[^/]+/.test(pathname),
  },
};

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

function compactSearchQuery(query, maxLength = 390) {
  const cleaned = stripSearchText(query);
  if (cleaned.length <= maxLength) return cleaned;

  const required = [];
  const optional = [];
  cleaned.split(/\s+/).forEach((token) => {
    if (!token) return;
    if (token.startsWith("site:") || token.startsWith("-")) required.push(token);
    else optional.push(token);
  });

  const output = [];
  [...optional, ...required].forEach((token) => {
    const next = [...output, token].join(" ");
    if (next.length <= maxLength) output.push(token);
  });

  return output.join(" ");
}

function buildBehanceSearchPhrase(query) {
  const genericTokens = new Set([
    "reference",
    "references",
    "case",
    "study",
    "design",
    "website",
    "web",
    "ui",
    "ux",
    "homepage",
    "landing",
    "page",
    "premium",
    "minimal",
    "visual",
    "concept",
    "концепт",
    "сайт",
    "сайта",
    "дизайн",
    "референс",
    "референсы",
  ]);
  const tokens = stripSearchText(query)
    .replace(/-\S+/g, " ")
    .toLowerCase()
    .match(/[\p{L}\p{N}]{4,}/gu) || [];
  const meaningful = [...new Set(tokens)].filter((token) => !genericTokens.has(token)).slice(0, 6);
  const phrase = meaningful.length ? meaningful.join(" ") : "website landing page";
  return `${phrase} website`;
}

const briefOptions = {
  task: [
    "Редизайн существующего сайта",
    "Поднять визуальный уровень",
    "Имиджевый сайт для доверия",
    "Портфолио высокого уровня",
    "Конкурировать с архитектурными студиями",
    "Заменить PDF-презентацию",
  ],
  effect: [
    "У них есть вкус",
    "Это уровень архитектурной студии",
    "Им можно доверить дорогой объект",
    "Они понимают материалы и атмосферу",
    "Это international premium level",
    "Они сильны и в дизайне, и в инженерии",
  ],
  tone: [
    "Архитектурный",
    "Дорогой минимализм",
    "Спокойная премиальность",
    "Журнальный / editorial",
    "Галерейный",
    "Contemporary hospitality",
    "Камень, дерево, вода",
    "Материальный / tactile",
    "Natural luxury",
    "Инженерно-точный",
    "Тихая уверенность",
    "Пространство как искусство",
    "Японская сдержанность",
    "Светлый воздушный",
    "Сдержанный статус",
  ],
  avoid: [
    "Шаблонный SaaS-вид",
    "Банальные wellness-иконки",
    "Стоковые улыбающиеся люди",
    "Кислотные цвета",
    "Слишком пустой минимализм",
    "Дешевые 3D-иконки",
    "Спа-клише",
    "Избыточный luxury с золотом",
  ],
};

function normalizeBriefArray(items, allowed) {
  if (!Array.isArray(items)) return [];
  return [...new Set(items.filter((item) => allowed.includes(item)))];
}

function normalizeCustomBriefArray(items, baseOptions) {
  if (!Array.isArray(items)) return [];
  const base = new Set(baseOptions);
  return [...new Set(items.map(stripSearchText))]
    .filter((item) => item.length >= 3 && item.length <= 72 && !base.has(item))
    .slice(0, 6);
}

function extractJsonObject(text) {
  const cleaned = String(text || "").replace(/```json|```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Модель не вернула JSON");
  }
  return JSON.parse(cleaned.slice(start, end + 1));
}

async function requestBriefFromOpenRouter(wish, model) {
  if (!openrouterApiKey) {
    throw new Error("OPENROUTER_API_KEY не настроен на сервере");
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${openrouterApiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://noway.spaces.community",
      "X-Title": "Noway Art Direction Pipeline",
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content: [
            "You are a senior art-director briefing assistant.",
            "Convert the user's rough request into a concise website art-direction brief.",
            "Return only valid JSON. Use Russian for all text fields.",
            "For task/effect/tone/avoid, choose only exact values from the provided option lists.",
            "Also add project-specific customOptions for each group when the base options are too generic.",
            "Custom options must be short selectable phrases, not explanations.",
            "Do not invent a URL. If no URL is present, return an empty string.",
          ].join(" "),
        },
        {
          role: "user",
          content: JSON.stringify({
            wish,
            options: briefOptions,
            output_shape: {
              title: "short project title",
              url: "optional URL",
              audience: "target audience",
              goal: "main design/business goal",
              task: ["exact option"],
              effect: ["exact option"],
              tone: ["exact option"],
              avoid: ["exact option"],
              customOptions: {
                task: ["project-specific option"],
                effect: ["project-specific option"],
                tone: ["project-specific option"],
                avoid: ["project-specific option"],
              },
              questions: ["optional clarification question"],
            },
          }),
        },
      ],
      temperature: 0.2,
      provider: {
        require_parameters: true,
      },
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "brief_from_wish",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              title: { type: "string" },
              url: { type: "string" },
              audience: { type: "string" },
              goal: { type: "string" },
              task: { type: "array", items: { type: "string", enum: briefOptions.task } },
              effect: { type: "array", items: { type: "string", enum: briefOptions.effect } },
              tone: { type: "array", items: { type: "string", enum: briefOptions.tone } },
              avoid: { type: "array", items: { type: "string", enum: briefOptions.avoid } },
              customOptions: {
                type: "object",
                additionalProperties: false,
                properties: {
                  task: { type: "array", items: { type: "string" } },
                  effect: { type: "array", items: { type: "string" } },
                  tone: { type: "array", items: { type: "string" } },
                  avoid: { type: "array", items: { type: "string" } },
                },
                required: ["task", "effect", "tone", "avoid"],
              },
              questions: { type: "array", items: { type: "string" } },
            },
            required: ["title", "url", "audience", "goal", "task", "effect", "tone", "avoid", "customOptions", "questions"],
          },
        },
      },
    }),
  });
  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result?.error?.message || result?.message || "OpenRouter не ответил");
  }

  const content = result?.choices?.[0]?.message?.content;
  const parsed = typeof content === "string" ? extractJsonObject(content) : content;
  return {
    title: stripSearchText(parsed?.title),
    url: stripSearchText(parsed?.url),
    audience: stripSearchText(parsed?.audience),
    goal: stripSearchText(parsed?.goal),
    task: normalizeBriefArray(parsed?.task, briefOptions.task),
    effect: normalizeBriefArray(parsed?.effect, briefOptions.effect),
    tone: normalizeBriefArray(parsed?.tone, briefOptions.tone),
    avoid: normalizeBriefArray(parsed?.avoid, briefOptions.avoid),
    customOptions: {
      task: normalizeCustomBriefArray(parsed?.customOptions?.task, briefOptions.task),
      effect: normalizeCustomBriefArray(parsed?.customOptions?.effect, briefOptions.effect),
      tone: normalizeCustomBriefArray(parsed?.customOptions?.tone, briefOptions.tone),
      avoid: normalizeCustomBriefArray(parsed?.customOptions?.avoid, briefOptions.avoid),
    },
    questions: Array.isArray(parsed?.questions) ? parsed.questions.map(stripSearchText).filter(Boolean).slice(0, 3) : [],
  };
}

async function createBriefFromWish(wish) {
  try {
    return await requestBriefFromOpenRouter(wish, openrouterBriefModel);
  } catch (error) {
    if (!openrouterFallbackModel || openrouterFallbackModel === openrouterBriefModel) throw error;
    return requestBriefFromOpenRouter(wish, openrouterFallbackModel);
  }
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

function normalizeReferencePath(hostname, pathname) {
  const cleanPath = pathname.replace(/\/+$/, "") || "/";
  if (hostname === "behance.net") {
    const parts = cleanPath.split("/").filter(Boolean);
    if (parts[0] === "gallery" && parts[1]) return `/gallery/${parts[1]}`;
  }
  if (hostname === "dribbble.com") {
    const parts = cleanPath.split("/").filter(Boolean);
    if (parts[0] === "shots" && parts[1]) return `/shots/${parts[1].split("-")[0]}`;
  }
  if (hostname.endsWith("pinterest.com")) {
    const parts = cleanPath.split("/").filter(Boolean);
    if (parts[0] === "pin" && parts[1]) return `/pin/${parts[1]}`;
  }
  if (hostname === "awwwards.com") {
    const parts = cleanPath.split("/").filter(Boolean);
    if (parts[0] === "sites" && parts[1]) return `/sites/${parts[1]}`;
  }
  return cleanPath.toLowerCase();
}

function getReferenceKey(item) {
  try {
    const parsed = new URL(item.url);
    const hostname = parsed.hostname.replace(/^www\./, "").toLowerCase();
    return `${hostname}${normalizeReferencePath(hostname, parsed.pathname)}`;
  } catch {
    return "";
  }
}

function dedupeReferenceResults(results) {
  const seenUrls = new Set();
  const seenTitles = new Set();
  return results.filter((item) => {
    const urlKey = getReferenceKey(item);
    const titleKey = stripSearchText(item.title || "")
      .toLowerCase()
      .replace(/[^a-zа-яё0-9]+/gi, " ")
      .trim();
    const compactTitleKey = titleKey.split(" ").slice(0, 8).join(" ");
    if (!urlKey || seenUrls.has(urlKey)) return false;
    if (compactTitleKey && seenTitles.has(compactTitleKey)) return false;
    seenUrls.add(urlKey);
    if (compactTitleKey) seenTitles.add(compactTitleKey);
    return true;
  });
}

function extractTopicTokens(query) {
  const genericTokens = new Set([
    "website",
    "design",
    "reference",
    "case",
    "study",
    "homepage",
    "landing",
    "premium",
    "minimal",
    "brand",
    "visual",
    "concept",
    "font",
    "typeface",
    "typography",
    "logo",
    "template",
    "wordpress",
    "elementor",
    "article",
    "blog",
    "list",
    "концепт",
    "сайт",
    "сайта",
    "дизайн",
    "референс",
    "референсы",
    "премиальных",
  ]);
  const tokens = [...new Set(
    query
      .replace(/-\S+/g, " ")
      .toLowerCase()
      .match(/[\p{L}\p{N}]{4,}/gu) || [],
  )].filter((token) => !genericTokens.has(token));
  const latinTokens = tokens.filter((token) => /[a-z]/.test(token));
  return (latinTokens.length >= 3 ? latinTokens : tokens).slice(0, 16);
}

function scoreTopicRelevance(item, topicTokens = []) {
  if (!topicTokens.length) return { hits: 0, score: 0 };
  const haystack = `${item.title} ${item.description} ${item.url}`.toLowerCase();
  const hits = topicTokens.filter((token) => haystack.includes(token));
  return { hits: hits.length, score: Math.min(hits.length * 0.14, 0.7) };
}

function scoreReferenceResult(item) {
  const url = item.url.toLowerCase();
  const hostname = new URL(item.url).hostname.replace(/^www\./, "");
  const text = `${item.title} ${item.description}`.toLowerCase();
  const badDomains = [
    "instagram.com",
    "facebook.com",
    "youtube.com",
    "tiktok.com",
    "reddit.com",
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

function isAcceptedSourceReference(item, sourceId) {
  if (!sourceId || !searchSources[sourceId]) return true;
  try {
    const parsed = new URL(item.url);
    return searchSources[sourceId].acceptPath(parsed.pathname);
  } catch {
    return false;
  }
}

function isLowQualityReference(item, sourceId) {
  const url = item.url.toLowerCase();
  const hostname = new URL(item.url).hostname.replace(/^www\./, "");
  const text = `${item.title} ${item.description}`.toLowerCase();
  const blockedDomains = [
    "instagram.com",
    "facebook.com",
    "youtube.com",
    "tiktok.com",
    "reddit.com",
    "x.com",
    "twitter.com",
    "themeforest.net",
    "templatemag.com",
  ];
  const blockedUrlParts = ["/template", "/templates", "/theme", "/themes", "/download", "/market/product"];
  const blockedTextParts = [
    "website builder",
    "portfolio template",
    "wordpress theme",
    "wordpress",
    "elementor",
    "premium template",
    "free template",
    "free websites",
    "portfolio online",
    "portfolio hosting",
    "sharing your portfolio",
    "where do you think",
  ];
  const blockedNonBehanceTextParts = [
    "information architecture",
    "user persona",
    "user journey",
    "ux case study",
    "ui ux designer",
  ];

  return (
    (sourceId !== "pinterest" && blockedDomains.some((domain) => hostname === domain || hostname.endsWith(`.${domain}`))) ||
    blockedUrlParts.some((part) => url.includes(part)) ||
    blockedTextParts.some((part) => text.includes(part)) ||
    (sourceId !== "behance" && blockedNonBehanceTextParts.some((part) => text.includes(part)))
  );
}

function rankReferenceResults(results, count, sourceId, relevanceQuery = "") {
  const topicTokens = extractTopicTokens(relevanceQuery);
  const ranked = dedupeReferenceResults(results)
    .filter((item) => isAcceptedSourceReference(item, sourceId) && !isLowQualityReference(item, sourceId))
    .map((item) => {
      const topicRelevance = scoreTopicRelevance(item, topicTokens);
      const minimumTopicHits = topicTokens.length >= 6 ? 2 : 1;
      return {
        ...item,
        topicHits: topicRelevance.hits,
        minimumTopicHits,
        referenceScore: scoreReferenceResult(item) + topicRelevance.score - (topicTokens.length >= 3 && !topicRelevance.hits ? 0.65 : 0),
      };
    })
    .sort((a, b) => b.referenceScore - a.referenceScore)
    .filter((item) => item.referenceScore > -0.75);
  const topicMatched = ranked.filter((item) => !topicTokens.length || topicTokens.length < 3 || item.topicHits >= item.minimumTopicHits);
  return (topicMatched.length ? topicMatched : ranked).slice(0, count);
}

async function braveSearch(query, count, sourceId, relevanceQuery = query) {
  if (!braveSearchApiKey) {
    throw new Error("BRAVE_SEARCH_API_KEY не настроен на сервере");
  }

  const url = new URL("https://api.search.brave.com/res/v1/web/search");
  url.searchParams.set("q", query);
  const requestedCount = Math.min(Math.max(count * 3, 10), 20);
  url.searchParams.set("count", String(requestedCount));
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
    .filter((item) => item.url), count, sourceId, relevanceQuery);
}

async function tavilySearch(query, count, domains = [], sourceId, relevanceQuery = query) {
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
      max_results: Math.min(Math.max(count * 4, 12), 20),
      include_answer: false,
      include_raw_content: false,
      include_images: false,
      include_domains: domains,
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
    .filter((item) => item.url), count, sourceId, relevanceQuery);
}

async function behanceDirectSearch(query, count, relevanceQuery = query) {
  let browser;
  const phrase = buildBehanceSearchPhrase(relevanceQuery || query);
  const searchUrl = `https://www.behance.net/search/projects?search=${encodeURIComponent(phrase)}`;

  browser = await chromium.launch({
    headless: true,
    args: ["--disable-dev-shm-usage"],
  });

  try {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1100 },
      deviceScaleFactor: 1,
    });
    await page.goto(searchUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(1200);

    const results = await page.evaluate(() => {
      const anchors = [...document.querySelectorAll('a[href*="/gallery/"]')];
      return anchors.map((anchor) => {
        const url = new URL(anchor.getAttribute("href"), window.location.origin).toString();
        const card = anchor.closest("li, article, div") || anchor;
        const title = (anchor.getAttribute("title") || anchor.textContent || card.textContent || "").trim();
        return {
          title,
          url,
          description: card.textContent || title,
          score: 0.5,
        };
      });
    });

    return rankReferenceResults(results, count, "behance", relevanceQuery);
  } finally {
    if (browser) await browser.close();
  }
}

async function searchProvider(query, count, domains = [], sourceId, relevanceQuery = query) {
  if (sourceId === "behance") return behanceDirectSearch(query, count, relevanceQuery);
  if (tavilyApiKey) return tavilySearch(query, count, domains, sourceId, relevanceQuery);
  if (!braveSearchApiKey) {
    throw new Error("TAVILY_API_KEY не настроен на сервере");
  }
  return braveSearch(query, count, sourceId, relevanceQuery);
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

app.post("/api/brief-from-wish", async (req, res) => {
  try {
    const wish = stripSearchText(req.body?.wish);
    if (!wish || wish.length < 10) {
      throw new Error("Опишите задачу чуть подробнее");
    }
    res.json(await createBriefFromWish(wish));
  } catch (error) {
    res.status(400).json({ error: error.message || "Не удалось собрать бриф" });
  }
});

app.post("/api/search-references", async (req, res) => {
  try {
    const query = stripSearchText(req.body?.query);
    const count = Number(req.body?.count || 8);
    const selectedSources = Array.isArray(req.body?.sources)
      ? req.body.sources.filter((source) => source === "behance")
      : ["behance"];
    if (!query || query.length < 3) {
      throw new Error("Введите поисковый запрос");
    }
    if (!selectedSources.length) {
      throw new Error("Выберите хотя бы один источник поиска");
    }

    const perSourceCount = Math.max(5, Math.ceil(count / selectedSources.length));
    const groupedResults = [];
    for (const source of selectedSources) {
      const sourceConfig = searchSources[source];
      const sourceQuery = compactSearchQuery(`${query} ${sourceConfig.queryHint}`);
      const results = await searchProvider(sourceQuery, perSourceCount, sourceConfig.domains, source, query);
      groupedResults.push(results.map((item) => ({ ...item, sourceRoute: sourceConfig.label, sourceId: source })));
    }

    const searchResults = [];
    const seenSearchResults = new Set();
    for (let index = 0; searchResults.length < count && index < perSourceCount; index += 1) {
      groupedResults.forEach((group) => {
        if (!group[index] || searchResults.length >= count) return;
        const referenceKey = getReferenceKey(group[index]);
        if (!referenceKey || seenSearchResults.has(referenceKey)) return;
        seenSearchResults.add(referenceKey);
        searchResults.push(group[index]);
      });
    }
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
          sourceRoute: result.sourceRoute,
          sourceId: result.sourceId,
          preview: screenshot.preview,
          description: result.description,
          tags: [...new Set([result.sourceId, ...inferDesignTags(textForTags)])],
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
