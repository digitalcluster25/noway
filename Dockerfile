FROM mcr.microsoft.com/playwright:v1.56.1-noble

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev

COPY server.js ./
COPY index.html styles.css app.js ./public/
COPY assets ./public/assets
COPY scripts ./scripts

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
