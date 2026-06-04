# Skynet Nuxt

> Фронтенд для AI Factory на базе Nuxt 4

Современный фронтенд-проект для верстки UI с подготовкой к будущему подключению Laravel-бэкенда. TypeScript, Vue 3 Composition API, файловая маршрутизация.

## Быстрый старт

```bash
npm install
npm run dev
```

Dev-сервер запустится на `http://localhost:3000`

## Ключевые возможности

- **Vue 3 Composition API** — современные реактивные компоненты
- **Nuxt 4** — SSR/SSG, файловая маршрутизация, auto-imports
- **TypeScript** — полная типизация
- **Vitest** — unit и интеграционные тесты
- **ESLint** — линтер кода
- **@nuxt/image** — оптимизация изображений
- **@nuxt/fonts** — автоматическая загрузка шрифтов

## Пример

```vue
<script setup lang="ts">
const { count, increment } = useCounter(0)
</script>

<template>
  <button @click="increment">Счётчик: {{ count }}</button>
</template>
```

## Технологический стек

| Технология | Версия | Назначение |
|------------|--------|------------|
| Nuxt | 4.4.6 | Фреймворк |
| Vue | 3.5.34 | UI библиотека |
| TypeScript | - | Язык |
| Vitest | 4.1.8 | Тестирование |
| ESLint | 10.4.1 | Линтер |

---

## Документация

| Руководство | Описание |
|-------------|----------|
| [Начало работы](docs/getting-started.md) | Установка, запуск, тестирование |
| [Архитектура](docs/architecture.md) | Структура проекта и паттерны |

## License

Private
