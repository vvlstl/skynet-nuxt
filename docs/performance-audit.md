# Аудит производительности Lighthouse

> Дата: 12 июля 2026
> URL: http://localhost:3000/skynet-nuxt/
> Production: https://vvlstl.github.io/skynet-nuxt/
> Инструмент: lighthouse-mcp (desktop)

## Общая оценка: 25 / 100

## Метрики

| Метрика | Значение | Норма | Оценка |
|---------|---------|-------|--------|
| First Contentful Paint (FCP) | 9.8 с | < 1.8 с | ❌ |
| Largest Contentful Paint (LCP) | 15.1 с | < 2.5 с | ❌ |
| Total Blocking Time (TBT) | 4 920 мс | < 200 мс | ❌ |
| Cumulative Layout Shift (CLS) | 0.001 | < 0.1 | ✅ |
| Speed Index | 22.4 с | < 3.4 с | ❌ |
| Time to Interactive (TTI) | 69.5 с | < 3.8 с | ❌ |

## Сравнение с предыдущим тестом (28 июня → 12 июля)

| Метрика | 28 июня | **12 июля** | Динамика |
|---------|---------|-------------|----------|
| Performance Score | 25 | **25** | — |
| FCP | 15.0 с | **9.8 с** | ✅ +5.2 с |
| LCP | 25.6 с | **15.1 с** | ✅ +10.5 с |
| TBT | 2 550 мс | **4 920 мс** | ❌ +2 370 мс |
| CLS | 0.004 | **0.001** | ✅ |
| Speed Index | 22.3 с | **22.4 с** | ≈ |
| TTI | 61.5 с | **69.5 с** | ❌ +8 с |

## Оптимизации — Итерация 2 (13 июля 2026)

### Что сделано

1. **Ленивая загрузка секций** — Devices, PricingSection, HowItWorks через defineAsyncComponent (отдельные чанки)
2. **Globe deferred** — requestIdleCallback для Three.js init, rootMargin 200px → 0px
3. **Font preload** — Bender-Bold, Bender-Black, Zector-Regular в useHead <link rel=preload>
4. **Nitro compression** — gzip + brotli пред-сжатие статики при generate
5. **HTML minification** — minify: true + features.inlineStyles: false (CSS в отдельном файле)
6. **Prefetch** — PricingSection + HowItWorks чанки в requestIdleCallback после GSAP setup
7. **routeRules** — Cache-Control для /_nuxt/** и /fonts/** (future self-hosted)

### Результаты замеров

| Метрика | До | После | Цель |
|---------|----|-------|------|
| HTML raw | 134 KB | **53 KB** | < 30 KB |
| HTML gz | — | **12.8 KB** | < 10 KB |
| Entry chunk gz | — | **119 KB** | < 200 KB ✅ |
| Итого initial (entry+css+gsap+fonts) gz | — | **~190 KB** | — |
| Font preload (<head> woff2) | ❌ | ✅ 3/3 | — |
| Brotli/gzip статики | ❌ | ✅ | — |
| CSS external | inline 134 KB | **8.6 KB brotli** | ✅ |

### Замечания

- vendor-three + d3 слиты в один chunk (501 KB raw / 125 KB gz) — загружается lazy, не блокирует FCP
- 4 pre-existing lint ошибок в baseline (Globe.vue, index.vue, Globe.test.ts) — не относятся к оптимизациям
- Cache-Control заголовки routeRules не применяются на GitHub Pages (статический хостинг)

## Google PageSpeed Insights (production)

CrUX данных недостаточно (мало реальных пользователей).

## Примечание

Аудит проводился на dev-режиме Nuxt. В production-сборке показатели могут отличаться.
