[←](getting-started.md) · [Стили →](styling.md)

# Архитектура проекта

## Обзор

Слоистая архитектура для Nuxt 4 фронтенд-приложения. Основной принцип — разделение на горизонтальные слои: презентация (страницы), компоненты (UI), composables (логика), утилиты.

## Структура папок

```
app/
├── pages/                    # Слой презентации — маршруты
│   └── index.vue             # Главная страница
├── layouts/                  # Слой макетов
│   └── default.vue
├── components/               # Слой UI-компонентов
│   ├── ui/                   # Базовые компоненты (кнопки, инпуты)
│   ├── Hero.vue              # Секции лендинга
│   ├── Features.vue
│   ├── PricingSection.vue
│   ├── NetworkSection.vue
│   ├── TelegramSection.vue
│   └── Footer.vue
├── composables/              # Слой бизнес-логики (логика, состояние)
│   └── useCounter.ts
├── assets/
│   ├── css/                  # Стили (Less, BEM)
│   │   ├── _var.less         # Переменные
│   │   ├── _mixins.less      # Примеси
│   │   ├── _fonts.less       # Шрифты
│   │   ├── style.less        # Точка входа
│   │   ├── base/             # Базовые стили
│   │   │   ├── common.less
│   │   │   ├── header.less
│   │   │   ├── footer.less
│   │   │   └── text-content.less
│   │   └── partials/         # Стили секций
│   │       ├── hero/
│   │       ├── features/
│   │       ├── pricing/
│   │       ├── network/
│   │       └── telegram/
│   └── images/               # Оптимизированные изображения
├── utils/                    # Слой утилит (чистые функции)
│   └── formatDate.ts
├── types/                    # TypeScript-типы и интерфейсы
│   └── index.ts
├── middleware/               # Middleware Nuxt
│   └── auth.ts
└── app.vue                   # Корневой компонент
```

## Правила зависимостей

- ✅ Pages → Components (страницы импортируют и компонуют компоненты)
- ✅ Components → Composables (компоненты вызывают логику)
- ✅ Composables → Utils (composables используют вспомогательные функции)
- ✅ Utils → nothing (чистые функции, без зависимостей)
- ❌ Components → Pages (компоненты не знают о страницах)
- ❌ Composables → Components (логика не знает о представлении)
- ❌ Skipping слоёв (pages не вызывает utils напрямую в обход components/composables)

## Коммуникация слоёв

- **Page → Component:** передача props вниз
- **Component → Composable:** вызов composable-функций для состояния/логики
- **Component → Component:** events (emit) для коммуникации вверх
- **Composable → Composable:** композиция через вложенные вызовы

## Ключевые принципы

1. Компоненты — только презентация. Любая логика — в composables
2. Стили изолированы по BEM. Один компонент = один less-файл
3. Утилиты — чистые функции без состояния и Vue-зависимостей
4. Nuxt auto-imports для components/ и composables/ — не импортировать вручную

## Примеры кода

### Компонент с composable

```vue
<script setup lang="ts">
// Composables auto-imported Nuxt
const { data, error } = useSomeLogic()
</script>

<template>
  <section class="hero">
    <h1 class="hero__title">{{ data?.title }}</h1>
  </section>
</template>
```

### Composable с утилитой

```ts
// composables/useSomeLogic.ts
export function useSomeLogic() {
  const formatted = formatDate(new Date()) // utils/formatDate.ts
  return { formatted }
}
```

## Антипаттерны

- ❌ Логика внутри компонентов — выносить в composables
- ❌ Прямые вызовы utils из pages — через composables
- ❌ Глобальные стили без BEM — использовать BEM для всех новых стилей
- ❌ Мутация props — использовать emit для изменений

## См. также

- [Стили и BEM](styling.md)
- [Тестирование](testing.md)
- [Начало работы](getting-started.md)
