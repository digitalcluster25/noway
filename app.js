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

const defaults = new Set([
  "Редизайн существующего сайта",
  "Поднять визуальный уровень",
  "Имиджевый сайт для доверия",
  "Конкурировать с архитектурными студиями",
  "У них есть вкус",
  "Это уровень архитектурной студии",
  "Им можно доверить дорогой объект",
  "Они понимают материалы и атмосферу",
  "Архитектурный",
  "Дорогой минимализм",
  "Спокойная премиальность",
  "Contemporary hospitality",
  "Камень, дерево, вода",
  "Материальный / tactile",
  "Natural luxury",
  "Тихая уверенность",
  "Шаблонный SaaS-вид",
  "Банальные wellness-иконки",
  "Стоковые улыбающиеся люди",
  "Кислотные цвета",
  "Слишком пустой минимализм",
]);

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

const references = [
  {
    title: "Full-bleed project opening",
    source: "Awwwards pattern",
    visual: "visual-architecture",
    tags: ["layout", "photo"],
    note: "Первый экран строится вокруг проекта, а не вокруг рекламного слогана.",
  },
  {
    title: "Editorial serif hierarchy",
    source: "Architecture portfolio",
    visual: "visual-editorial",
    tags: ["typography", "layout"],
    note: "Крупный спокойный заголовок сразу меняет ощущение ценового сегмента.",
  },
  {
    title: "Water and warm stone",
    source: "Wellness resort",
    visual: "visual-wellness",
    tags: ["photo", "materials"],
    note: "Wellness-слой выражается через материалы и свет, а не через иконки.",
  },
  {
    title: "Material close-up system",
    source: "Interior studio",
    visual: "visual-material",
    tags: ["materials", "photo"],
    note: "Детали помогают доказать качество и ремесленную точность.",
  },
  {
    title: "Investor presentation grid",
    source: "Hospitality deck",
    visual: "visual-investor",
    tags: ["layout", "typography"],
    note: "Структура подходит для девелоперов: цифры, масштаб, этапы, контроль.",
  },
  {
    title: "Quiet ritual composition",
    source: "Spa/onsen reference",
    visual: "visual-japanese",
    tags: ["photo", "materials"],
    note: "Можно взять сдержанность и ритм, не копируя культурные клише.",
  },
  {
    title: "Gallery-like project cards",
    source: "Design studio",
    visual: "visual-architecture",
    tags: ["layout", "photo"],
    note: "Проекты выглядят как коллекция объектов, а не как обычный список услуг.",
  },
  {
    title: "Warm minimal interface",
    source: "Boutique hotel",
    visual: "visual-wellness",
    tags: ["typography", "materials"],
    note: "Хороший баланс между premium и живой человеческой атмосферой.",
  },
];

const concepts = [
  {
    title: "Architectural Editorial",
    visual: "visual-editorial",
    copy: "Главная как архитектурное портфолио: большой проект, строгая сетка, serif-заголовки, спокойные подписи.",
    palette: ["#f4f0e8", "#30302d", "#b8ad9d", "#596a55"],
  },
  {
    title: "Natural Luxury Wellness",
    visual: "visual-wellness",
    copy: "Теплее и мягче: вода, дерево, свет, slow luxury, ощущение пространства для восстановления.",
    palette: ["#efe6d4", "#8f5f42", "#7e9ea1", "#40514d"],
  },
  {
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
    copy: "Агент не ищет только spa website. Он уводит исследование в смежные области: архитектура, hospitality, материалы и editorial-подача.",
  },
  moodboard: {
    title: "Оцениваем не картинку, а причину",
    copy: "Лайк без причины почти бесполезен. MVP собирает, что именно понравилось: типографика, сетка, фото, материалы или ощущение премиальности.",
  },
  concepts: {
    title: "Финал: стратегия вместо угадывания",
    copy: "Обратная связь превращается в visual strategy и 3 концепт-маршрута, которые можно развивать в мокапы, Figma или промпты.",
  },
};

function renderChips() {
  Object.entries(chipData).forEach(([group, items]) => {
    const mount = document.querySelector(`[data-group="${group}"]`);
    mount.innerHTML = items
      .map(
        (item) =>
          `<button class="chip ${defaults.has(item) ? "is-selected" : ""}" type="button">${item}</button>`,
      )
      .join("");
  });
}

function renderDirections() {
  document.querySelector("#direction-grid").innerHTML = directions
    .map(
      (item) => `
        <article class="direction-card">
          <div class="direction-visual ${item.visual}"></div>
          <div class="card-body">
            <h3>${item.title}</h3>
            <p>${item.copy}</p>
            <p><strong>Риск:</strong> ${item.risk}</p>
            <div class="card-actions">
              <button class="mini-button is-active" type="button">Оставить</button>
              <button class="mini-button" type="button">Ослабить</button>
              <button class="mini-button" type="button">Убрать</button>
            </div>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderReferences(filter = "all") {
  const visible = references.filter((item) => filter === "all" || item.tags.includes(filter));
  document.querySelector("#moodboard-grid").innerHTML = visible
    .map(
      (item, index) => `
        <article class="reference-card">
          <div class="reference-visual ${item.visual}"></div>
          <div class="card-body">
            <div class="meta">
              <span class="tag">${item.source}</span>
              ${item.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
            </div>
            <h3>${item.title}</h3>
            <p>${item.note}</p>
            <div class="rating">
              <button class="mini-button" type="button" data-rate="${index}-like">Нравится</button>
              <button class="mini-button" type="button" data-rate="${index}-dislike">Не подходит</button>
            </div>
            <div class="reason-row">
              <button class="reason" type="button">Типографика</button>
              <button class="reason" type="button">Фото</button>
              <button class="reason" type="button">Премиальность</button>
              <button class="reason" type="button">Теплее</button>
            </div>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderConcepts() {
  document.querySelector("#concept-grid").innerHTML = concepts
    .map(
      (item) => `
        <article class="concept-card">
          <div class="concept-visual ${item.visual}"></div>
          <div class="card-body">
            <h3>${item.title}</h3>
            <p>${item.copy}</p>
            <div class="palette">
              ${item.palette.map((color) => `<span class="swatch" style="background:${color}"></span>`).join("")}
            </div>
            <div class="card-actions">
              <button class="mini-button is-active" type="button">Развить</button>
              <button class="mini-button" type="button">Смешать</button>
              <button class="mini-button" type="button">Отклонить</button>
            </div>
          </div>
        </article>
      `,
    )
    .join("");
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
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const target = event.target;

    if (target.matches(".chip, .mini-button, .reason")) {
      target.classList.toggle("is-selected");
      if (target.matches(".mini-button")) {
        target.classList.toggle("is-active");
      }
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
    }
  });

  document.querySelector("#export-brief").addEventListener("click", async () => {
    const brief = [
      "Home Wood Spa redesign",
      "Audience: developers, investors, architects",
      "Positioning: premium architectural wellness studio",
      "Tone: architectural, quiet premium, material, natural luxury",
      "Avoid: SaaS look, generic wellness icons, stock smiling people, acid colors, empty minimalism",
      "Concept routes: Architectural Editorial, Natural Luxury Wellness, Investor-Grade Hospitality",
    ].join("\n");

    await navigator.clipboard.writeText(brief);
    const toast = document.querySelector("#toast");
    toast.classList.add("is-visible");
    window.setTimeout(() => toast.classList.remove("is-visible"), 1600);
  });
}

renderChips();
renderDirections();
renderReferences();
renderConcepts();
bindEvents();
