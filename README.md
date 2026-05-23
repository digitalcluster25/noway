# Art Direction Pipeline MVP

Рабочий прототип интерфейса для пайплайна арт-дирекшна сайта.

## Что уже есть

- 4 шага: Brief, Directions, Moodboard, Concepts.
- Предзаполненный кейс Home Wood Spa.
- База формулировок для пользователя, который не обязан говорить языком дизайнера.
- Генерация направлений для moodboard research.
- Карточки референсов с оценкой и причинами.
- Автосохранение проекта в браузере через `localStorage`.
- Ручной импорт референсов по URL.
- Финальная visual strategy, которая собирается из выбранных формулировок и оценок.
- 3 concept routes.

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

Контейнер использует Caddy только как внутренний static server.
Наружный HTTPS и домен обслуживает Traefik через Docker labels.

Обновление после нового push:

```bash
cd /home/deploy/noway
./deploy.sh
```

## Следующий слой MVP

- Реальный сбор ссылок и скриншотов референсов.
- Экспорт moodboard в Notion, Airtable или Figma/FigJam.
- Генерация промптов под каждый concept route.
- Создание первых homepage-концептов.
