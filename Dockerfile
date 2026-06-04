# syntax=docker/dockerfile:1

# --- Dependencies (production only) ---
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# --- Builder ---
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci
COPY . .
RUN npm run build

# --- Development ---
FROM node:22-alpine AS development
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci
COPY . .
EXPOSE 3000 9229
CMD ["npm", "run", "dev"]

# --- Production ---
FROM node:22-alpine AS production
WORKDIR /app
RUN addgroup -g 1001 -S appuser && \
    adduser -S -u 1001 -G appuser appuser
COPY --from=deps --chown=appuser:appuser /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appuser /app/.output ./.output
COPY --chown=appuser:appuser package.json ./
USER appuser
EXPOSE 3000
ENV HOST=0.0.0.0
CMD ["node", ".output/server/index.mjs"]
