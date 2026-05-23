const storageKey = "noway-art-direction-project-v4";

const hwsImages = {
  pool: "assets/hws-spa-pool.png",
  sauna: "assets/hws-sauna-wood.png",
  hammam: "assets/hws-hammam-stone.png",
  exterior: "assets/hws-resort-exterior.png",
  material: "assets/hws-material-water.png",
  lobby: "assets/hws-hospitality-lobby.png",
};

const previewTone = {
  "visual-architecture": "architecture",
  "visual-wellness": "wellness",
  "visual-material": "material",
  "visual-investor": "investor",
  "visual-editorial": "editorial",
  "visual-japanese": "japanese",
};

const chipData = {
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

const defaultSelections = {
  task: [
    "Редизайн существующего сайта",
    "Поднять визуальный уровень",
    "Имиджевый сайт для доверия",
    "Конкурировать с архитектурными студиями",
  ],
  effect: [
    "У них есть вкус",
    "Это уровень архитектурной студии",
    "Им можно доверить дорогой объект",
    "Они понимают материалы и атмосферу",
  ],
  tone: [
    "Архитектурный",
    "Дорогой минимализм",
    "Спокойная премиальность",
    "Contemporary hospitality",
    "Камень, дерево, вода",
    "Материальный / tactile",
    "Natural luxury",
    "Тихая уверенность",
  ],
  avoid: [
    "Шаблонный SaaS-вид",
    "Банальные wellness-иконки",
    "Стоковые улыбающиеся люди",
    "Кислотные цвета",
    "Слишком пустой минимализм",
  ],
};

const directions = [
  {
    title: "Premium Architecture Studio",
    visual: "visual-architecture",
    copy: "Берем сетку, крупные проектные изображения, строгую навигацию и ощущение профессиональной уверенности.",
    risk: "Может стать слишком холодно, если убрать wellness-слой.",
  },
  {
    title: "Luxury Wellness Resort",
    visual: "visual-wellness",
    copy: "Добавляет тепло, воду, свет, телесность и ощущение дорогого отдыха без банных клише.",
    risk: "Есть риск уйти в гостиничный lifestyle и потерять инженерную экспертизу.",
  },
  {
    title: "Material & Craft",
    visual: "visual-material",
    copy: "Фокус на дереве, камне, паре, технических узлах и ручной точности исполнения.",
    risk: "Нужно не превратить сайт в каталог материалов.",
  },
  {
    title: "Investor-Grade Hospitality",
    visual: "visual-investor",
    copy: "Более презентационный язык для девелоперов: масштаб, надежность, сроки, комплексность.",
    risk: "Может стать слишком корпоративно, если убрать атмосферу пространства.",
  },
  {
    title: "Editorial Minimalism",
    visual: "visual-editorial",
    copy: "Журнальная подача, много воздуха, сильные заголовки и аккуратная работа с паузами.",
    risk: "Чрезмерная пустота будет выглядеть как недоделанный дизайн.",
  },
  {
    title: "Japanese Spa Restraint",
    visual: "visual-japanese",
    copy: "Сдержанность, ритуальность, натуральность и чистые композиции для премиального SPA-настроения.",
    risk: "Нельзя делать поверхностную стилизацию под Японию.",
  },
];

const seedReferences = [
  {
    id: "seed-1",
    title: "Full-bleed project opening",
    source: "Awwwards pattern",
    url: "",
    direction: "Premium Architecture Studio",
    visual: "visual-architecture",
    image: "",
    tags: ["layout", "photo"],
    note: "Первый экран строится вокруг проекта, а не вокруг рекламного слогана.",
    rating: "",
    reasons: [],
  },
  {
    id: "seed-2",
    title: "Editorial serif hierarchy",
    source: "Architecture portfolio",
    url: "",
    direction: "Editorial Minimalism",
    visual: "visual-editorial",
    image: "",
    tags: ["typography", "layout"],
    note: "Крупный спокойный заголовок сразу меняет ощущение ценового сегмента.",
    rating: "",
    reasons: [],
  },
  {
    id: "seed-3",
    title: "Water and warm stone",
    source: "Wellness resort",
    url: "",
    direction: "Luxury Wellness Resort",
    visual: "visual-wellness",
    image: "",
    tags: ["photo", "materials"],
    note: "Wellness-слой выражается через материалы и свет, а не через иконки.",
    rating: "",
    reasons: [],
  },
  {
    id: "seed-4",
    title: "Material close-up system",
    source: "Interior studio",
    url: "",
    direction: "Material & Craft",
    visual: "visual-material",
    image: "",
    tags: ["materials", "photo"],
    note: "Детали помогают доказать качество и ремесленную точность.",
    rating: "",
    reasons: [],
  },
  {
    id: "seed-5",
    title: "Investor presentation grid",
    source: "Hospitality deck",
    url: "",
    direction: "Investor-Grade Hospitality",
    visual: "visual-investor",
    image: "",
    tags: ["layout", "typography"],
    note: "Структура подходит для девелоперов: цифры, масштаб, этапы, контроль.",
    rating: "",
    reasons: [],
  },
  {
    id: "seed-6",
    title: "Quiet ritual composition",
    source: "Spa/onsen reference",
    url: "",
    direction: "Japanese Spa Restraint",
    visual: "visual-japanese",
    image: "",
    tags: ["photo", "materials"],
    note: "Можно взять сдержанность и ритм, не копируя культурные клише.",
    rating: "",
    reasons: [],
  },
  {
    id: "seed-7",
    title: "Gallery-like project cards",
    source: "Design studio",
    url: "",
    direction: "Premium Architecture Studio",
    visual: "visual-architecture",
    image: "",
    tags: ["layout", "photo"],
    note: "Проекты выглядят как коллекция объектов, а не как обычный список услуг.",
    rating: "",
    reasons: [],
  },
  {
    id: "seed-8",
    title: "Warm minimal interface",
    source: "Boutique hotel",
    url: "",
    direction: "Luxury Wellness Resort",
    visual: "visual-wellness",
    image: "",
    tags: ["typography", "materials"],
    note: "Хороший баланс между premium и живой человеческой атмосферой.",
    rating: "",
    reasons: [],
  },
];

const candidateTemplates = [
  ["Editorial hero with large typography", "Premium Architecture Studio", "visual-editorial", ["hero", "typography", "editorial"], ""],
  ["Premium service storytelling page", "Luxury Wellness Resort", "visual-wellness", ["service-page", "storytelling"], ""],
  ["Material-driven case study page", "Material & Craft", "visual-material", ["materials", "case-study"], ""],
  ["Trust proof and process layout", "Investor-Grade Hospitality", "visual-investor", ["layout", "proof", "process"], ""],
  ["Gallery-style project index", "Editorial Minimalism", "visual-architecture", ["project-grid", "portfolio"], ""],
  ["Quiet minimal navigation system", "Japanese Spa Restraint", "visual-japanese", ["navigation", "minimal"], ""],
  ["Full-bleed media landing page", "Premium Architecture Studio", "visual-architecture", ["hero", "media"], ""],
  ["Warm minimal brand page", "Luxury Wellness Resort", "visual-wellness", ["brand", "materials"], ""],
  ["Dense but elegant proof blocks", "Investor-Grade Hospitality", "visual-investor", ["proof", "ui-density"], ""],
  ["Tactile detail storytelling", "Material & Craft", "visual-material", ["materials", "storytelling"], ""],
  ["Magazine-like content hierarchy", "Editorial Minimalism", "visual-editorial", ["typography", "editorial"], ""],
  ["Restrained premium service site", "Japanese Spa Restraint", "visual-japanese", ["premium-service", "minimal"], ""],
];

const languageDimensions = [
  {
    title: "Visual tone",
    copy: "Общее ощущение: premium, editorial, tactile, restrained, warm или technical.",
    queries: ["quiet premium web design", "warm minimal brand website", "editorial luxury landing page"],
  },
  {
    title: "Layout pattern",
    copy: "Композиция страницы: hero, project grid, case study, index, longform storytelling.",
    queries: ["gallery style project index", "large typography hero website", "case study landing page design"],
  },
  {
    title: "Trust mechanism",
    copy: "Как сайт доказывает уровень: проекты, процесс, цифры, экспертиза, материалы, партнеры.",
    queries: ["premium service proof section", "process storytelling website", "high-end portfolio proof layout"],
  },
  {
    title: "Media style",
    copy: "Как используются изображения: full-bleed, detail shots, editorial crops, restrained motion.",
    queries: ["full bleed media website", "material storytelling web design", "editorial image crop layout"],
  },
  {
    title: "Typography",
    copy: "Шрифтовой язык: крупный serif, neutral grotesk, magazine hierarchy, quiet captions.",
    queries: ["large serif typography website", "editorial typography landing page", "premium portfolio typography"],
  },
  {
    title: "UI density",
    copy: "Насколько интерфейс плотный: галерейный, презентационный, рабочий, dashboard-like, sparse.",
    queries: ["dense elegant web layout", "minimal premium service website", "portfolio grid navigation"],
  },
];

const concepts = [
  {
    id: "architectural-editorial",
    title: "Architectural Editorial",
    visual: "visual-editorial",
    copy: "Главная как архитектурное портфолио: большой проект, строгая сетка, serif-заголовки, спокойные подписи.",
    palette: ["#f4f0e8", "#30302d", "#b8ad9d", "#596a55"],
  },
  {
    id: "natural-luxury-wellness",
    title: "Natural Luxury Wellness",
    visual: "visual-wellness",
    copy: "Теплее и мягче: вода, дерево, свет, slow luxury, ощущение пространства для восстановления.",
    palette: ["#efe6d4", "#8f5f42", "#7e9ea1", "#40514d"],
  },
  {
    id: "investor-grade-hospitality",
    title: "Investor-Grade Hospitality",
    visual: "visual-investor",
    copy: "Строже и презентационнее: масштаб объектов, комплексность, этапы, доверие к реализации под ключ.",
    palette: ["#30302d", "#ded8cc", "#8f8a7b", "#596a55"],
  },
];

const agentCopy = {
  brief: {
    title: "Сначала фиксируем язык проекта",
    copy: "Пользователь может не знать профессиональных формулировок. Поэтому интерфейс предлагает готовые варианты и собирает из них дизайн-гипотезу.",
  },
  directions: {
    title: "Теперь превращаем выборы в поисковые направления",
    copy: "Агент не ищет по отрасли напрямую. Он превращает ответы в визуальный язык: паттерны, сетки, типографику, media style и способы доказать доверие.",
  },
  moodboard: {
    title: "Строим универсальный язык поиска",
    copy: "Business domain не равен reference domain. Здесь формируются запросы по design language, которые потом питают Discover.",
  },
  discover: {
    title: "Reference Tinder перед moodboard",
    copy: "Пользователь голосует по одному варианту. Понравившиеся попадают в moodboard, а следующая пачка подгружается уже ближе к выбранному вкусу.",
  },
  "moodboard-review": {
    title: "Оцениваем не картинку, а причину",
    copy: "Лайк без причины почти бесполезен. MVP собирает, что именно понравилось: типографика, сетка, фото, материалы или ощущение премиальности.",
  },
  concepts: {
    title: "Финал: стратегия вместо угадывания",
    copy: "Обратная связь превращается в visual strategy и 3 концепт-маршрута, которые можно развивать в мокапы, Figma или промпты.",
  },
};

const state = loadState();

function createDefaultState() {
  return {
    project: {
      title: "Home Wood Spa redesign",
      url: "https://homewoodspa.com/",
      audience: "Девелоперы, инвесторы, архитекторы",
      goal: "Создать впечатление: эти ребята знают толк в дизайне, все будет на уровне",
    },
    selections: structuredClone(defaultSelections),
    directionStatus: Object.fromEntries(directions.map((item) => [item.title, "keep"])),
    references: structuredClone(seedReferences),
    candidates: createCandidates(0),
    languageQueries: structuredClone(languageDimensions),
    conceptStatus: Object.fromEntries(concepts.map((item) => [item.id, "develop"])),
    activeFilter: "all",
  };
}

function createCandidates(offset = 0) {
  return candidateTemplates.map(([title, direction, visual, tags, image], index) => ({
    id: `candidate-${offset + index + 1}`,
    title: `${title} ${offset ? `#${offset + index + 1}` : ""}`.trim(),
    source: ["Awwwards search", "Behance search", "Dribbble search", "Siteinspire search"][index % 4],
    url: "",
    direction,
    visual,
    image,
    tags,
    note: "Кандидат для быстрого отбора. В реальной версии здесь будет найденный URL, скриншот и источник поиска.",
    vote: "",
  }));
}

function loadState() {
  const saved = localStorage.getItem(storageKey);
  if (!saved) return createDefaultState();

  try {
    return { ...createDefaultState(), ...JSON.parse(saved) };
  } catch {
    return createDefaultState();
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
  renderSummary();
  renderStrategy();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function listOrFallback(items, fallback) {
  return items.length ? items.join(", ") : fallback;
}

function imageForVisual(visual) {
  return "";
}

function referenceImage(item) {
  return item.image || imageForVisual(item.visual);
}

function webPreview(item, size = "reference") {
  const tone = previewTone[item.visual] || "architecture";
  const projectBars = item.tags?.includes("project-grid") || item.tags?.includes("layout");
  const proof = item.tags?.includes("proof") || item.tags?.includes("case-study");
  return `
    <div class="web-preview ${tone} ${size}">
      <div class="web-nav">
        <span></span><span></span><span></span>
      </div>
      <div class="web-hero">
        <div class="web-title"></div>
        <div class="web-subtitle"></div>
      </div>
      <div class="web-media"></div>
      <div class="web-content ${projectBars ? "grid" : ""} ${proof ? "proof" : ""}">
        <span></span><span></span><span></span><span></span>
      </div>
    </div>
  `;
}

function visualMarkup(item, className) {
  const image = referenceImage(item);
  if (image) {
    return `<div class="${className}" style="background-image:url('${image}')"></div>`;
  }
  return `<div class="${className}">${webPreview(item, className.includes("discover") ? "large" : "reference")}</div>`;
}

function renderProjectFields() {
  document.querySelector("#project-title").value = state.project.title;
  document.querySelector("#project-url").value = state.project.url;
  document.querySelector("#project-audience").value = state.project.audience;
  document.querySelector("#project-goal").value = state.project.goal;
}

function renderSummary() {
  document.querySelector("#summary-project").textContent = state.project.title || "Новый проект";
  document.querySelector("#summary-audience").textContent = state.project.audience || "Аудитория не задана";
  document.querySelector("#summary-positioning").textContent = buildPositioning();
}

function buildPositioning() {
  const hasArchitecture = state.selections.tone.some((item) => item.includes("Архитектур"));
  const hasWellness = state.selections.tone.some((item) => item.includes("hospitality") || item.includes("Natural"));
  if (hasArchitecture && hasWellness) return "Premium architectural wellness";
  if (hasArchitecture) return "Premium architecture direction";
  return "Premium visual direction";
}

function renderChips() {
  Object.entries(chipData).forEach(([group, items]) => {
    const selected = new Set(state.selections[group]);
    const mount = document.querySelector(`[data-group="${group}"]`);
    mount.innerHTML = items
      .map(
        (item) =>
          `<button class="chip ${selected.has(item) ? "is-selected" : ""}" type="button" data-chip-group="${group}" data-chip="${escapeHtml(item)}">${item}</button>`,
      )
      .join("");
  });
}

function renderDirections() {
  document.querySelector("#direction-grid").innerHTML = directions
    .map((item) => {
      const status = state.directionStatus[item.title] || "keep";
      return `
        <article class="direction-card">
          <div class="direction-visual ${item.visual}"></div>
          <div class="card-body">
            <div class="meta">
              <span class="tag">${status === "keep" ? "selected" : status}</span>
            </div>
            <h3>${item.title}</h3>
            <p>${item.copy}</p>
            <p><strong>Риск:</strong> ${item.risk}</p>
            <div class="card-actions">
              <button class="mini-button ${status === "keep" ? "is-active" : ""}" type="button" data-direction="${item.title}" data-direction-status="keep">Оставить</button>
              <button class="mini-button ${status === "soften" ? "is-active" : ""}" type="button" data-direction="${item.title}" data-direction-status="soften">Ослабить</button>
              <button class="mini-button ${status === "remove" ? "is-active" : ""}" type="button" data-direction="${item.title}" data-direction-status="remove">Убрать</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderReferenceDirectionOptions() {
  const options = directions
    .filter((item) => state.directionStatus[item.title] !== "remove")
    .map((item) => `<option value="${item.title}">${item.title}</option>`)
    .join("");
  document.querySelector("#reference-direction").innerHTML = options;
}

function renderLanguage() {
  document.querySelector("#language-grid").innerHTML = state.languageQueries
    .map(
      (item) => `
        <article class="language-item">
          <p class="eyebrow">${item.title}</p>
          <h3>${item.title}</h3>
          <p>${item.copy}</p>
          <div class="query-list">
            ${item.queries.map((query) => `<span class="query-pill">${query}</span>`).join("")}
          </div>
        </article>
      `,
    )
    .join("");
}

function getCurrentCandidate() {
  return state.candidates.find((candidate) => !candidate.vote);
}

function renderDiscover() {
  const candidate = getCurrentCandidate();
  const likedCount = state.references.filter((item) => item.fromDiscover).length;
  const votedCount = state.candidates.filter((item) => item.vote).length;
  document.querySelector("#liked-count").textContent = likedCount;
  document.querySelector("#voted-count").textContent = votedCount;

  if (!candidate) {
    document.querySelector("#discover-card").innerHTML = `
      <div class="discover-visual visual-editorial"></div>
      <div class="discover-body">
        <p class="eyebrow">Пачка закончилась</p>
        <h3>Нужно больше вариантов</h3>
        <p>Подгрузите еще 12 кандидатов или переходите в Moodboard Review, если уже достаточно понравившихся референсов.</p>
      </div>
    `;
    return;
  }

  document.querySelector("#discover-card").innerHTML = `
    ${visualMarkup(candidate, "discover-visual")}
    <div class="discover-body">
      <div class="meta">
        <span class="tag">${candidate.source}</span>
        <span class="tag">${candidate.direction}</span>
        ${candidate.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>
      <h3>${escapeHtml(candidate.title)}</h3>
      <p>${escapeHtml(candidate.note)}</p>
    </div>
  `;
}

function voteCandidate(vote) {
  const candidate = getCurrentCandidate();
  if (!candidate) return;
  candidate.vote = vote;

  if (vote === "like" && !state.references.some((item) => item.id === `ref-${candidate.id}`)) {
    state.references.unshift({
      id: `ref-${candidate.id}`,
      title: candidate.title,
      source: candidate.source,
      url: candidate.url,
      direction: candidate.direction,
      visual: candidate.visual,
      image: candidate.image,
      tags: candidate.tags,
      note: candidate.note,
      rating: "like",
      reasons: [],
      fromDiscover: true,
    });
  }

  renderDiscover();
  renderReferences();
  saveState();
}

function loadMoreCandidates() {
  const offset = state.candidates.length;
  state.candidates.push(...createCandidates(offset));
  renderDiscover();
  saveState();
}

function renderReferences(filter = state.activeFilter) {
  state.activeFilter = filter;
  const visible = state.references.filter((item) => {
    if (filter === "all") return true;
    if (filter === "manual") return item.manual;
    if (filter === "discover") return item.fromDiscover;
    return item.tags.includes(filter);
  });

  document.querySelector("#moodboard-grid").innerHTML = visible
    .map((item) => {
      return `
        <article class="reference-card">
          ${visualMarkup(item, "reference-visual")}
          <div class="card-body">
            <div class="meta">
              <span class="tag">${escapeHtml(item.source || "manual")}</span>
              <span class="tag">${escapeHtml(item.direction || "No direction")}</span>
              ${item.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
            </div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.note)}</p>
            ${item.url ? `<a class="reference-link" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">Открыть источник</a>` : ""}
            <div class="rating">
              <button class="mini-button ${item.rating === "like" ? "is-active" : ""}" type="button" data-reference="${item.id}" data-rating="like">Нравится</button>
              <button class="mini-button ${item.rating === "dislike" ? "is-active" : ""}" type="button" data-reference="${item.id}" data-rating="dislike">Не подходит</button>
            </div>
            <div class="reason-row">
              ${["Типографика", "Фото", "Премиальность", "Теплее", "Сетка", "Материалы"]
                .map(
                  (reason) =>
                    `<button class="reason ${item.reasons.includes(reason) ? "is-selected" : ""}" type="button" data-reference="${item.id}" data-reason="${reason}">${reason}</button>`,
                )
                .join("")}
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderConcepts() {
  const activeConcepts = concepts.filter((item) => state.conceptStatus[item.id] !== "reject");
  const rejectedConcepts = concepts.filter((item) => state.conceptStatus[item.id] === "reject");
  const cards = activeConcepts
    .map((item) => {
      const status = state.conceptStatus[item.id] || "develop";
      return `
        <article class="concept-card">
          <div class="concept-visual ${item.visual}"></div>
          <div class="card-body">
            <div class="meta">
              <span class="tag">${status === "develop" ? "active" : status}</span>
            </div>
            <h3>${item.title}</h3>
            <p>${item.copy}</p>
            <div class="palette">
              ${item.palette.map((color) => `<span class="swatch" style="background:${color}"></span>`).join("")}
            </div>
            <div class="card-actions">
              <button class="mini-button ${status === "develop" ? "is-active" : ""}" type="button" data-concept="${item.id}" data-concept-status="develop">Развить</button>
              <button class="mini-button ${status === "mix" ? "is-active" : ""}" type="button" data-concept="${item.id}" data-concept-status="mix">Смешать</button>
              <button class="mini-button ${status === "reject" ? "is-active danger" : ""}" type="button" data-concept="${item.id}" data-concept-status="reject">Отклонить</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
  const restoreStrip = rejectedConcepts.length
    ? `
      <article class="restore-strip">
        <div>
          <p class="eyebrow">Отклоненные</p>
          <strong>${rejectedConcepts.map((item) => item.title).join(", ")}</strong>
        </div>
        <div class="card-actions">
          ${rejectedConcepts
            .map(
              (item) =>
                `<button class="mini-button" type="button" data-concept="${item.id}" data-concept-status="develop">Вернуть ${item.title}</button>`,
            )
            .join("")}
        </div>
      </article>
    `
    : "";

  document.querySelector("#concept-grid").innerHTML = cards + restoreStrip;
}

function getPromptPack() {
  const activeConcepts = concepts.filter((item) => state.conceptStatus[item.id] !== "reject");
  const tone = listOrFallback(state.selections.tone.slice(0, 8), "premium, precise, editorial");
  const avoid = listOrFallback(state.selections.avoid.slice(0, 10), "generic stock imagery, SaaS layout, cheap icons");
  const audience = state.project.audience || "premium clients";
  const goal = state.project.goal || "create trust and premium visual impression";
  const liked = state.references
    .filter((item) => item.rating === "like")
    .map((item) => item.title)
    .slice(0, 6);
  const likedLine = listOrFallback(liked, "large photography, restrained typography, material detail, architectural composition");

  const routePrompts = activeConcepts.map((concept, index) => {
    const routeDetail = {
      "architectural-editorial":
        "Use large full-bleed project photography, editorial grid, restrained serif headline, precise spacing, quiet navigation, portfolio-first composition. Homepage sections: hero with one strong project image, short positioning statement, selected projects, process, materials/engineering proof, CTA.",
      "natural-luxury-wellness":
        "Use warm stone, wood, water, steam, soft daylight, tactile material close-ups, quiet luxury hospitality mood. Homepage sections: immersive wellness hero, material atmosphere, project gallery, service scope, sensory details, consultation CTA.",
      "investor-grade-hospitality":
        "Use confident grid, project scale, calm data blocks, engineering credibility, hospitality-level imagery, strict navigation. Homepage sections: positioning hero, proof of complex delivery, flagship projects, process timeline, partner/developer trust signals, CTA.",
    }[concept.id];
    const instruction =
      state.conceptStatus[concept.id] === "mix"
        ? "Blend this route with the strongest traits from the other active concept routes, but keep its core direction recognizable."
        : "Develop this route as a distinct visual concept.";

    return {
      id: concept.id,
      title: `Concept ${String.fromCharCode(65 + index)}: ${concept.title}`,
      text: [
        `Create a premium homepage visual concept for ${state.project.title || "a premium design-led company"}.`,
        `Audience: ${audience}.`,
        `Goal: ${goal}.`,
        `Direction: ${concept.title}.`,
        `Instruction: ${instruction}`,
        `Visual tone: ${tone}.`,
        routeDetail,
        `Take inspiration from liked references: ${likedLine}.`,
        "Output: high-end website mockup, desktop viewport, polished art direction, realistic layout, no placeholder lorem ipsum.",
      ].join("\n"),
    };
  });

  return [
    ...routePrompts,
    {
      id: "negative-prompt",
      title: "Negative Prompt",
      text: [
        `Avoid: ${avoid}.`,
        "No generic SaaS cards, no neon gradients, no smiling stock people, no cheap 3D icons, no wellness cliches such as stones, bamboo, orchids, candles, leaf icons or water-drop icons.",
        "Avoid overly empty minimalism, fake luxury gold/marble excess, generic construction company layout, corporate template feel, illegible small text, overlapping UI, and decorative visuals without product relevance.",
      ].join("\n"),
    },
  ];
}

function renderPromptPack() {
  const promptPack = getPromptPack();
  document.querySelector("#prompt-grid").innerHTML = promptPack
    .map(
      (prompt, index) => `
        <article class="prompt-card">
          <header>
            <h4>${prompt.title}</h4>
            <button class="mini-button" type="button" data-copy-prompt="${index}">Копировать</button>
          </header>
          <pre>${escapeHtml(prompt.text)}</pre>
        </article>
      `,
    )
    .join("");
}

function renderStrategy() {
  const likes = state.references.filter((item) => item.rating === "like");
  const dislikedReasons = state.references
    .filter((item) => item.rating === "dislike")
    .flatMap((item) => item.reasons);
  const likedReasons = likes.flatMap((item) => item.reasons);
  const keptDirections = directions
    .filter((item) => state.directionStatus[item.title] !== "remove")
    .map((item) => item.title);

  document.querySelector("#strategy-title").textContent = buildPositioning() + " studio";
  document.querySelector("#strategy-copy").textContent =
    `${state.project.title || "Проект"} должен выглядеть как ${buildPositioning().toLowerCase()}: ` +
    "не угадывать стиль по одному промпту, а опираться на выбранные формулировки, направления и оцененные референсы.";
  document.querySelector("#strategy-tone").textContent = listOrFallback(
    state.selections.tone.slice(0, 8),
    "Тон пока не выбран.",
  );
  document.querySelector("#strategy-likes").textContent = listOrFallback(
    [...new Set(likedReasons.length ? likedReasons : likes.map((item) => item.title))].slice(0, 8),
    "Оцените несколько референсов, чтобы стратегия стала точнее.",
  );
  document.querySelector("#strategy-ui").textContent = listOrFallback(
    keptDirections.slice(0, 5),
    "Направления пока не выбраны.",
  );
  document.querySelector("#strategy-avoid").textContent = listOrFallback(
    [...new Set([...state.selections.avoid, ...dislikedReasons])].slice(0, 10),
    "Ограничения пока не выбраны.",
  );
  renderPromptPack();
}

function setStep(stepId) {
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("is-active", view.id === stepId);
  });

  document.querySelectorAll(".step").forEach((step) => {
    step.classList.toggle("is-active", step.dataset.step === stepId);
  });

  document.querySelector("#agent-title").textContent = agentCopy[stepId].title;
  document.querySelector("#agent-copy").textContent = agentCopy[stepId].copy;
  renderStrategy();
}

function updateProjectFromInputs() {
  state.project.title = document.querySelector("#project-title").value.trim();
  state.project.url = document.querySelector("#project-url").value.trim();
  state.project.audience = document.querySelector("#project-audience").value.trim();
  state.project.goal = document.querySelector("#project-goal").value.trim();
  saveState();
}

function readImageFile(file) {
  if (!file) return Promise.resolve("");

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function getProjectExport() {
  return {
    exportedAt: new Date().toISOString(),
    project: state.project,
    positioning: buildPositioning(),
    selections: state.selections,
    directionStatus: state.directionStatus,
    references: state.references,
    strategy: {
      title: document.querySelector("#strategy-title").textContent,
      copy: document.querySelector("#strategy-copy").textContent,
      tone: document.querySelector("#strategy-tone").textContent,
      likes: document.querySelector("#strategy-likes").textContent,
      ui: document.querySelector("#strategy-ui").textContent,
      avoid: document.querySelector("#strategy-avoid").textContent,
    },
    concepts,
    prompts: getPromptPack(),
  };
}

function buildMarkdown() {
  const liked = state.references.filter((item) => item.rating === "like");
  const disliked = state.references.filter((item) => item.rating === "dislike");
  const keptDirections = directions.filter((item) => state.directionStatus[item.title] !== "remove");

  return [
    `# ${state.project.title || "Art Direction Project"}`,
    "",
    `URL: ${state.project.url || "-"}`,
    `Audience: ${state.project.audience || "-"}`,
    `Goal: ${state.project.goal || "-"}`,
    `Positioning: ${buildPositioning()}`,
    "",
    "## Selected Language",
    "",
    `Task: ${state.selections.task.join(", ") || "-"}`,
    `Effect: ${state.selections.effect.join(", ") || "-"}`,
    `Tone: ${state.selections.tone.join(", ") || "-"}`,
    `Avoid: ${state.selections.avoid.join(", ") || "-"}`,
    "",
    "## Research Directions",
    "",
    ...keptDirections.map((item) => `- ${item.title}: ${item.copy}`),
    "",
    "## Liked References",
    "",
    ...(liked.length
      ? liked.map((item) => `- ${item.title}${item.url ? ` (${item.url})` : ""}: ${item.note}`)
      : ["- No liked references yet."]),
    "",
    "## Disliked References",
    "",
    ...(disliked.length
      ? disliked.map((item) => `- ${item.title}${item.reasons.length ? `: ${item.reasons.join(", ")}` : ""}`)
      : ["- No disliked references yet."]),
    "",
    "## Visual Strategy",
    "",
    `Title: ${document.querySelector("#strategy-title").textContent}`,
    "",
    document.querySelector("#strategy-copy").textContent,
    "",
    `Tone: ${document.querySelector("#strategy-tone").textContent}`,
    `Strengthen: ${document.querySelector("#strategy-likes").textContent}`,
    `UI: ${document.querySelector("#strategy-ui").textContent}`,
    `Avoid: ${document.querySelector("#strategy-avoid").textContent}`,
    "",
    "## Prompt Pack",
    "",
    ...getPromptPack().flatMap((prompt) => [`### ${prompt.title}`, "", prompt.text, ""]),
  ].join("\n");
}

function downloadText(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function screenshotReference(url) {
  const response = await fetch("/api/screenshot-reference", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error || "Не удалось сделать screenshot");
  }
  return result;
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const target = event.target;

    if (target.matches("[data-chip]")) {
      const group = target.dataset.chipGroup;
      const value = target.dataset.chip;
      const selected = new Set(state.selections[group]);
      if (selected.has(value)) selected.delete(value);
      else selected.add(value);
      state.selections[group] = [...selected];
      renderChips();
      saveState();
    }

    if (target.matches("[data-direction-status]")) {
      state.directionStatus[target.dataset.direction] = target.dataset.directionStatus;
      renderDirections();
      renderReferenceDirectionOptions();
      saveState();
    }

    if (target.matches("[data-rating]")) {
      const reference = state.references.find((item) => item.id === target.dataset.reference);
      reference.rating = reference.rating === target.dataset.rating ? "" : target.dataset.rating;
      renderReferences();
      saveState();
    }

    if (target.matches("[data-concept-status]")) {
      state.conceptStatus[target.dataset.concept] = target.dataset.conceptStatus;
      renderConcepts();
      renderPromptPack();
      saveState();
    }

    if (target.matches("[data-reason]")) {
      const reference = state.references.find((item) => item.id === target.dataset.reference);
      const reasons = new Set(reference.reasons);
      if (reasons.has(target.dataset.reason)) reasons.delete(target.dataset.reason);
      else reasons.add(target.dataset.reason);
      reference.reasons = [...reasons];
      renderReferences();
      saveState();
    }

    if (target.matches("[data-go]")) {
      setStep(target.dataset.go);
    }

    if (target.matches(".step")) {
      setStep(target.dataset.step);
    }

    if (target.matches(".filter")) {
      document.querySelectorAll(".filter").forEach((filter) => filter.classList.remove("is-active"));
      target.classList.add("is-active");
      renderReferences(target.dataset.filter);
      saveState();
    }

    if (target.matches("[data-copy-prompt]")) {
      const prompt = getPromptPack()[Number(target.dataset.copyPrompt)];
      navigator.clipboard.writeText(prompt.text);
      const toast = document.querySelector("#toast");
      toast.textContent = "Промпт скопирован";
      toast.classList.add("is-visible");
      window.setTimeout(() => toast.classList.remove("is-visible"), 1600);
    }
  });

  document.querySelectorAll("#project-title, #project-url, #project-audience, #project-goal").forEach((field) => {
    field.addEventListener("input", updateProjectFromInputs);
  });

  document.querySelector("#like-candidate").addEventListener("click", () => voteCandidate("like"));
  document.querySelector("#reject-candidate").addEventListener("click", () => voteCandidate("dislike"));
  document.querySelector("#load-candidates").addEventListener("click", loadMoreCandidates);

  document.querySelector("#reference-image").addEventListener("change", (event) => {
    const file = event.target.files[0];
    document.querySelector("#reference-image-label").textContent = file ? file.name : "Скриншот";
  });

  document.querySelector("#reference-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const status = document.querySelector("#reference-status");
    const url = document.querySelector("#reference-url").value.trim();
    const file = document.querySelector("#reference-image").files[0];
    let image = await readImageFile(file);
    let screenshot = null;
    status.textContent = "";

    if (url && !image) {
      status.textContent = "Делаю screenshot URL...";
      try {
        screenshot = await screenshotReference(url);
        image = screenshot.preview;
        status.textContent = "Screenshot готов и добавлен в карточку.";
      } catch (error) {
        status.textContent = `${error.message}. Карточка добавлена без screenshot.`;
      }
    }

    const tags = document
      .querySelector("#reference-tags")
      .value.split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean);

    state.references.unshift({
      id: `manual-${Date.now()}`,
      title: document.querySelector("#reference-title").value.trim() || screenshot?.title || "Manual reference",
      source: screenshot?.source || "Manual import",
      url,
      direction: document.querySelector("#reference-direction").value,
      visual: "visual-manual",
      tags: ["manual", ...tags],
      note: document.querySelector("#reference-note").value.trim() || "Пользователь добавил референс вручную.",
      image,
      rating: "like",
      reasons: [],
      manual: true,
    });

    event.target.reset();
    document.querySelector("#reference-image-label").textContent = "Скриншот";
    renderReferences("manual");
    document.querySelectorAll(".filter").forEach((filter) => {
      filter.classList.toggle("is-active", filter.dataset.filter === "manual");
    });
    saveState();
  });

  document.querySelector("#reset-project").addEventListener("click", () => {
    localStorage.removeItem(storageKey);
    Object.assign(state, createDefaultState());
    renderAll();
    setStep("brief");
  });

  document.querySelector("#export-brief").addEventListener("click", async () => {
    const brief = [
      state.project.title,
      `URL: ${state.project.url}`,
      `Audience: ${state.project.audience}`,
      `Goal: ${state.project.goal}`,
      `Positioning: ${buildPositioning()}`,
      `Tone: ${state.selections.tone.join(", ")}`,
      `Avoid: ${state.selections.avoid.join(", ")}`,
      `Directions: ${directions
        .filter((item) => state.directionStatus[item.title] !== "remove")
        .map((item) => item.title)
        .join(", ")}`,
      `Liked references: ${state.references
        .filter((item) => item.rating === "like")
        .map((item) => item.title)
        .join(", ")}`,
    ].join("\n");

    await navigator.clipboard.writeText(brief);
    const toast = document.querySelector("#toast");
    toast.textContent = "Brief скопирован";
    toast.classList.add("is-visible");
    window.setTimeout(() => toast.classList.remove("is-visible"), 1600);
  });

  document.querySelector("#export-json").addEventListener("click", () => {
    downloadText("art-direction-project.json", JSON.stringify(getProjectExport(), null, 2), "application/json");
  });

  document.querySelector("#export-markdown").addEventListener("click", () => {
    downloadText("visual-strategy.md", buildMarkdown(), "text/markdown");
  });

  document.querySelector("#copy-all-prompts").addEventListener("click", async () => {
    const allPrompts = getPromptPack()
      .map((prompt) => `${prompt.title}\n\n${prompt.text}`)
      .join("\n\n---\n\n");
    await navigator.clipboard.writeText(allPrompts);
    const toast = document.querySelector("#toast");
    toast.textContent = "Prompt Pack скопирован";
    toast.classList.add("is-visible");
    window.setTimeout(() => toast.classList.remove("is-visible"), 1600);
  });
}

function renderAll() {
  renderProjectFields();
  renderSummary();
  renderChips();
  renderDirections();
  renderReferenceDirectionOptions();
  renderLanguage();
  renderDiscover();
  renderReferences();
  renderConcepts();
  renderStrategy();
  renderPromptPack();
}

renderAll();
bindEvents();
