# 1) Builder stage: собираем Next.js
FROM node:18-alpine AS builder
WORKDIR /app

# Устанавливаем зависимости
COPY package*.json ./
RUN npm ci

# Копируем код и билдим
COPY . .
RUN npm run build

# 2) Runtime: Node.js + Nginx
FROM node:18-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=development

# Устанавливаем Nginx и утилиты
RUN apk add --no-cache nginx \
    && mkdir -p /run/nginx /var/log/nginx

# Копируем конфиг
COPY nginx.conf /etc/nginx/nginx.conf

# Копируем собранное приложение
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/package-lock.json /app/package-lock.json

# Ставим только Production-зависимости
RUN npm ci

# Копируем скрипт запуска
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Открываем порты: 80 (Nginx) и 3000 (Next.js локально)
EXPOSE 80 3000

CMD ["/app/start.sh"]