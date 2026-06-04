[Back to README](../README.md) · [Архитектура →](architecture.md)

# Начало работы

## Предварительные требования

- Node.js >= 22.22.0
- npm >= 10.9.4

## Установка

```bash
npm install
```

## Разработка

Запуск dev-сервера на `http://localhost:3000`:

```bash
npm run dev
```

## Сборка для продакшена

```bash
npm run build
```

Предварительный просмотр production-сборки:

```bash
npm run preview
```

## Тестирование

```bash
# Запуск всех тестов
npm test

# Тесты в режиме наблюдения
npm run test:watch

# Тесты с покрытием
npm run test:coverage

# Только unit-тесты
npm run test:unit

# Только Nuxt-тесты
npm run test:nuxt
```

## Проверка кода

```bash
# ESLint
npx eslint .
```

## See Also

- [Архитектура](architecture.md) — структура проекта и паттерны
- [AGENTS.md](../AGENTS.md) — карта проекта для AI-агентов
