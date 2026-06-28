# Skynet VPN

> Фронтенд-лендинг продукта Skynet VPN на Nuxt 4 с 3D-визуализацией серверов на Three.js.

Адаптивная вёрстка лендинга с секциями PromoBlock, Devices, NetworkSection (карта серверов), Pricing и HowItWorks. Glassmorphism-хедер с реактивным скрытием при скролле, скрамбл-эффекты на навигации, анимации появления через GSAP ScrollTrigger.

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

- **Nuxt 4 + Vue 3** — SSR-ready, файловая маршрутизация, Composition API
- **Three.js** — 3D-глобус с серверами на трёхмерной карте мира
- **Less/BEM** — модульная вёрстка с переменными и примесями
- **GSAP** — анимации появления секций и переходы
- **Glassmorphism Header** — blur + backdrop-filter, скрытие при скролле вниз
- **Hash-навигация** — переход к секциям с подсветкой активного якоря
- **Vitest** — тестирование компонентов и страниц

## Пример

```vue
<!-- app/components/layout/Header.vue -->
<script setup lang="ts">
import {usePageScroll} from '~/composables/usePageScroll'

const isFixed = ref(false)
const isHidden = ref(false)
const {scrollY} = usePageScroll()

function onScroll() {
  isFixed.value = scrollY.value > 0
  isHidden.value = isFixed.value && scrollTop.value < scrollY.value
}
</script>

<template>
  <header :class="{'header--fixed': isFixed, 'header--hidden': isHidden}">
    <Logo/>
    <AnchorsLink :items="navLinks"/>
  </header>
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
