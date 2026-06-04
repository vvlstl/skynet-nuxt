[← Начало работы](getting-started.md) · [Back to README](../README.md)

# Архитектура

Подробные архитектурные рекомендации см. в [ARCHITECTURE.md](../.ai-factory/ARCHITECTURE.md).

## Краткий обзор

Проект использует паттерн **модульный монолит** — чёткие модульные границы в рамках единой Nuxt-автоматизации.

## Структура проекта

```
.
├── app/                    # Корневые компоненты приложения
│   └── app.vue             # Точка входа Vue
├── components/             # Переиспользуемые Vue-компоненты
├── composables/            # Vue composables для бизнес-логики
├── pages/                  # Страницы с файловой маршрутизацией
├── layouts/                # Макеты страниц
├── assets/                 # Стили, изображения, шрифты
├── public/                 # Статические файлы
├── utils/                  # Вспомогательные функции
├── types/                  # TypeScript типы
├── middleware/             # Nuxt middleware
└── plugins/                # Nuxt plugins
```

## Правила зависимостей

- ✅ Страницы → composables, components, utils, types
- ✅ Composables → utils, types
- ✅ Компоненты → composables, utils, types
- ❌ Utils → composables
- ❌ Компоненты → страницы

## See Also

- [Начало работы](getting-started.md) — установка и запуск
- [.ai-factory/ARCHITECTURE.md](../.ai-factory/ARCHITECTURE.md) — полные архитектурные рекомендации
