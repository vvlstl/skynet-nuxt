[←](testing.md)

# Деплой

## Обзор

Используется Docker и Docker Compose для разработки и продакшена. Конфигурация находится в `compose.yml` и `compose.production.yml`.

## Docker Compose

### Файлы

- `compose.yml` — основная конфигурация
- `compose.override.yml` — переопределения для разработки
- `compose.production.yml` — продакшен

### Разработка

```bash
# Запуск в режиме разработки
docker-compose up -d

# Остановка
docker-compose down
```

### Продакшен

```bash
# Использовать продакшен-конфигурацию
docker-compose -f compose.yml -f compose.production.yml up -d

# Остановка
docker-compose -f compose.yml -f compose.production.yml down
```

## Структура Docker

```
.
├── compose.yml              # Основная конфигурация
├── compose.override.yml     # Переопределения для разработки
├── compose.production.yml   # Продакшен-конфигурация
├── docker/
│   ├── Dockerfile           # Dockerfile для Nuxt
│   └── nginx.conf           # Nginx конфигурация
└── .dockerignore            # Файлы, которые не попадают в образ
```

## Переменные окружения

`.env` файл:

```bash
# Порт для разработки
PORT=3000

# URL для API (будет подключен позже)
API_URL=http://localhost:8000
```

## Мониторинг

- Проверка логов: `docker-compose logs -f`
- Проверка состояния: `docker-compose ps`
- Очистка: `docker-compose down -v`

## См. также

- [Начало работы](getting-started.md)
- [Тестирование](testing.md)
- [Архитектура проекта](architecture.md)
