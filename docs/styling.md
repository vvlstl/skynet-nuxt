[←](architecture.md) · [Тестирование →](testing.md)

# Стили и BEM

## Обзор

Используется Less с BEM-методологией для модульной вёрстки. Стили разделены на base/ и partials/ для переиспользования.

## Переменные

Файл: `app/assets/css/_var.less`

```less
// Цвета
@primary-color: #007bff;
@secondary-color: #6c757d;
@success-color: #28a745;
@danger-color: #dc3545;
@warning-color: #ffc107;

// Шрифты
@font-family-base: 'Arial', sans-serif;
@font-size-base: 16px;
@line-height-base: 1.5;

// Отступы
@spacing-xs: 8px;
@spacing-sm: 16px;
@spacing-md: 24px;
@spacing-lg: 32px;
@spacing-xl: 48px;
```

## Примеси

Файл: `app/assets/css/_mixins.less`

```less
.centered() {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.box-shadow(@shadow) {
  box-shadow: @shadow;
}
```

## Структура BEM

```
.block
  .block__element
    .block__element--modifier
```

### Пример компонента

```less
// app/assets/css/partials/hero/hero.less
.hero {
  &__title {
    font-size: @font-size-base * 2;
    font-weight: bold;
  }

  &__subtitle {
    font-size: @font-size-base;
    color: @secondary-color;
  }

  &--dark {
    background-color: #333;
    color: white;
  }
}
```

### Пример компонента Vue

```vue
<template>
  <section class="hero hero--dark">
    <h1 class="hero__title">Skynet Nuxt</h1>
    <p class="hero__subtitle">Modern frontend</p>
  </section>
</template>

<style lang="less">
@import '~/assets/css/partials/hero/hero.less';
</style>
```

## Базовые стили

Файл: `app/assets/css/base/common.less`

```less
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: @font-family-base;
  font-size: @font-size-base;
  line-height: @line-height-base;
  color: #333;
}
```

## Стили секций

Каждая секция имеет свой файл в `partials/`:

- `hero.less` — стили для Hero секции
- `features.less` — стили для Features
- `pricing.less` — стили для Pricing
- `network.less` — стили для Network
- `telegram.less` — стили для Telegram
- `footer.less` — стили для Footer

## Рекомендации

1. Один компонент = один Less-файл
2. Использовать переменные для всех повторяющихся значений
3. Примеси для сложных стилей
4. BEM для именования классов
5. Изолированные стили для каждого компонента

## См. также

- [Архитектура проекта](architecture.md)
- [Тестирование](testing.md)
- [Начало работы](getting-started.md)
