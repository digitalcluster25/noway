# Art Direction Pipeline MVP

Рабочий прототип интерфейса для пайплайна арт-дирекшна сайта.

## Что уже есть

- 6 шагов: Brief, Directions, Language, Discover, Moodboard, Concepts.
- Предзаполненный кейс Home Wood Spa.
- База формулировок для пользователя, который не обязан говорить языком дизайнера.
- Генерация направлений для moodboard research.
- Карточки референсов с оценкой и причинами.
- Автосохранение проекта в браузере через `localStorage`.
- Ручной импорт референсов по URL.
- Reference Tinder: быстрый лайк/дизлайк кандидатов перед moodboard.
- Design Language слой: поиск строится по визуальным паттернам, а не по отрасли.
- Понравившиеся кандидаты автоматически попадают в Moodboard Review.
- Screenshot-style web previews без копирования чужих сайтов и ассетов.
- Backend screenshot API: URL в ручном импорте превращается в preview-картинку.
- Search Agent v1: поиск реальных сайтов через Tavily API, screenshots найденных URL и добавление в Discover.
- Batch URL import: список ссылок превращается в очередь Discover-кандидатов со screenshots.
- Загрузка изображения или скриншота в карточку референса.
- Финальная visual strategy, которая собирается из выбранных формулировок и оценок.
- 3 concept routes.
- Экспорт проекта в JSON и Markdown.
- Prompt Pack для трех concept routes и negative prompt.

## Как открыть

Откройте `index.html` в браузере или используйте локальный адрес:

```text
http://127.0.0.1:4173/
```

## Docker deploy

Проект подготовлен для деплоя за существующим Traefik на:

```text
https://noway.spaces.community
```

Запуск на VPS:

```bash
git clone git@github.com:digitalcluster25/noway.git /opt/noway
cd /opt/noway
docker compose up -d --build
```

Контейнер использует Node/Express и Playwright: отдает frontend и делает screenshots URL.
Наружный HTTPS и домен обслуживает Traefik через Docker labels.

Для полноценного MVP нужно добавить переменные окружения:

```bash
OPENROUTER_API_KEY=...
OPENROUTER_BRIEF_MODEL=nvidia/nemotron-nano-9b-v2:free
OPENROUTER_FALLBACK_MODEL=openrouter/free
TAVILY_API_KEY=...
```

`nvidia/nemotron-nano-9b-v2:free` используется как конкретная бесплатная модель бриф-агента. `openrouter/free` оставлен как fallback.
`BRAVE_SEARCH_API_KEY` можно оставить как запасной провайдер, если Tavily-ключ не задан.

Обновление после нового push:

```bash
cd /home/deploy/noway
./deploy.sh
```

## Следующий слой MVP

- Реальный сбор ссылок и скриншотов референсов.
- Экспорт moodboard в Notion, Airtable или Figma/FigJam.
- Создание первых homepage-концептов.
