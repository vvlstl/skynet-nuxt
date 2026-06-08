# Skynet Nuxt

> Фронтенд-приложение на Nuxt 4 для AI Factory. Верстка UI-компонентов и страниц.

## Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск разработки
npm run dev

# Сборка для продакшена
npm run build

# Генерация статичных страниц
npm run generate
```

## Ключевые возможности

- **Nuxt 4** — современный фреймворк с SSR и файловой маршрутизацией
- **Vue 3** — реактивный UI с Composition API
- **Less/BEM** — модульная вёрстка с переменными и примесями
- **GSAP** — анимации и интерактивность
- **Vitest** — тестирование компонентов и страниц
- **Docker** — контейнеризация для разработки и деплоя

## Пример

```vue
<!-- app/components/Hero.vue -->
<script setup lang="ts">
const title = 'Skynet Nuxt'
</script>

<template>
  <section class="hero">
    <h1 class="hero__title">{{ title }}</h1>
  </section>
</template>
```

---

## Документация

| Гайд | Описание |
|------|----------|
| [Начало работы](docs/getting-started.md) | Установка, настройка, первые шаги |
| [Архитектура](docs/architecture.md) | Структура проекта и паттерны |
| [Стили](docs/styling.md) | Less, BEM, переменные, примеси |
| [Тестирование](docs/testing.md) | Vitest, юнит-тесты, интеграционные тесты |
| [Деплой](docs/deployment.md) | Docker, compose, окружение |
