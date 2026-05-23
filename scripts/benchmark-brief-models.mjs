const apiKey = process.env.OPENROUTER_API_KEY;
const timeoutMs = Number(process.env.BENCHMARK_TIMEOUT_MS || 60000);
const wish =
  process.env.BENCHMARK_WISH ||
  "Нужен редизайн сайта архитектурной компании, чтобы он выглядел дороже и убедительнее для инвесторов, без шаблонного SaaS-вида";

const models = (process.env.BENCHMARK_MODELS || "")
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean);

const defaultModels = [
  "nvidia/nemotron-nano-9b-v2:free",
  "qwen/qwen3-next-80b-a3b-instruct:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
  "minimax/minimax-m2.5:free",
  "google/gemma-4-26b-a4b-it:free",
  "google/gemma-4-31b-it:free",
  "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",
  "openrouter/free",
];

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

function extractJsonObject(text) {
  const cleaned = String(text || "").replace(/```json|```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) throw new Error("no JSON object");
  return JSON.parse(cleaned.slice(start, end + 1));
}

function scoreBrief(brief) {
  const arrays = ["task", "effect", "tone", "avoid"];
  const validArrays = arrays.filter((key) => Array.isArray(brief[key]) && brief[key].length > 0).length;
  const filledText = ["title", "audience", "goal"].filter((key) => typeof brief[key] === "string" && brief[key].trim()).length;
  const inventedUrl = typeof brief.url === "string" && brief.url.trim() && !wish.includes(brief.url.trim());
  return filledText * 2 + validArrays * 2 - (inventedUrl ? 4 : 0);
}

async function runModel(model) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const started = Date.now();
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://noway.spaces.community",
        "X-Title": "Noway Art Direction Pipeline",
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: "system",
            content:
              "You are a senior art-director briefing assistant. Return only valid JSON. Use Russian. Choose task/effect/tone/avoid only from provided options. Do not invent a URL.",
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
                questions: ["optional clarification question"],
              },
            }),
          },
        ],
        temperature: 0.2,
        provider: { require_parameters: true },
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
                questions: { type: "array", items: { type: "string" } },
              },
              required: ["title", "url", "audience", "goal", "task", "effect", "tone", "avoid", "questions"],
            },
          },
        },
      }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result?.error?.message || result?.message || `HTTP ${response.status}`);
    const content = result?.choices?.[0]?.message?.content;
    const brief = typeof content === "string" ? extractJsonObject(content) : content;
    return {
      model,
      ok: true,
      ms: Date.now() - started,
      score: scoreBrief(brief),
      title: brief.title,
      task: brief.task,
      effect: brief.effect,
      tone: brief.tone,
      avoid: brief.avoid,
      usage: result.usage || null,
    };
  } catch (error) {
    return {
      model,
      ok: false,
      ms: Date.now() - started,
      error: error.name === "AbortError" ? `timeout ${timeoutMs}ms` : error.message,
    };
  } finally {
    clearTimeout(timeout);
  }
}

if (!apiKey) {
  console.error("OPENROUTER_API_KEY is missing");
  process.exit(1);
}

const candidates = models.length ? models : defaultModels;
const results = [];
for (const model of candidates) {
  const result = await runModel(model);
  results.push(result);
  console.log(JSON.stringify(result));
}

const ranked = results
  .filter((item) => item.ok)
  .sort((a, b) => b.score - a.score || a.ms - b.ms)
  .map(({ model, ms, score }) => ({ model, ms, score }));

console.error(JSON.stringify({ ranked }, null, 2));
