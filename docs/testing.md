[←](styling.md) · [Деплой →](deployment.md)

# Тестирование

## Обзор

Используется Vitest для юнит-тестов и интеграционных тестов Nuxt. Тесты находятся в `test/` директории.

## Структура тестов

```
test/
├── unit/                     # Юнит-тесты
│   ├── components/           # Тесты компонентов
│   └── utils/               # Тесты утилит
├── nuxt/                     # Интеграционные тесты Nuxt
│   └── pages/               # Тесты страниц
```

## Юнит-тесты

### Тест компонента

```ts
// test/unit/components/Hero.test.ts
import { mount } from '@vue/test-utils'
import Hero from '@/components/Hero.vue'

describe('Hero component', () => {
  test('renders title', () => {
    const wrapper = mount(Hero)
    expect(wrapper.find('.hero__title').text()).toBe('Skynet Nuxt')
  })
})
```

### Тест утилиты

```ts
// test/unit/utils/formatDate.test.ts
import { formatDate } from '@/utils/formatDate'

describe('formatDate', () => {
  test('formats date correctly', () => {
    const date = new Date('2024-01-01')
    expect(formatDate(date)).toBe('1/1/2024')
  })
})
```

## Интеграционные тесты Nuxt

```ts
// test/nuxt/pages/index.test.ts
import { setup, $fetch } from '@nuxt/test-utils'

describe('Index page', () => {
  await setup({
    rootDir: __dirname
  })

  test('page renders', async () => {
    const html = await $fetch('/')
    expect(html).toContain('Skynet Nuxt')
  })
})
```

## Запуск тестов

```bash
# Все тесты
npm run test

# Юнит-тесты
npm run test:unit

# Nuxt-тесты
npm run test:nuxt

# Покрытие кода
npm run test:coverage
```

## Тестирование composables

```ts
// composables/useCounter.ts
export function useCounter() {
  const count = ref(0)
  const increment = () => count.value++
  return { count, increment }
}

// test/unit/composables/useCounter.test.ts
describe('useCounter', () => {
  test('increments count', () => {
    const { count, increment } = useCounter()
    expect(count.value).toBe(0)
    increment()
    expect(count.value).toBe(1)
  })
})
```

## См. также

- [Архитектура проекта](architecture.md)
- [Стили](styling.md)
- [Деплой](deployment.md)
- [Начало работы](getting-started.md)
