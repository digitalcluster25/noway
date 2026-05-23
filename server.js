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

app.post("/api/screenshot-reference", async (req, res) => {
  let browser;
  try {
    const targetUrl = await validatePublicUrl(req.body?.url);
    await fs.mkdir(screenshotDir, { recursive: true });

    browser = await chromium.launch({
      headless: true,
      args: ["--disable-dev-shm-usage"],
    });
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

    res.json({
      title,
      url: targetUrl,
      source: new URL(targetUrl).hostname.replace(/^www\./, ""),
      preview: `/generated/screenshots/${filename}`,
    });
  } catch (error) {
    res.status(400).json({ error: error.message || "Не удалось сделать screenshot" });
  } finally {
    if (browser) await browser.close();
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.listen(port, () => {
  console.log(`Noway MVP listening on ${port}`);
});
