[←](../README.md) · [Архитектура →](architecture.md)

# Начало работы

## Требования

- Node.js 18+ 
- npm 9+
- Docker (для деплоя)

## Установка

\`\`\`bash
# Клонирование репозитория
git clone <repository-url>
cd skynet-nuxt

# Установка зависимостей
npm install

# Установка Docker (если не установлен)
# Ubuntu/Debian:
sudo apt-get install docker.io docker-compose
# macOS:
brew install docker
\`\`\`

## Настройка окружения

Создайте \`.env\` файл из примера:

\`\`\`bash
cp .env.example .env
\`\`\`

## Запуск в разработке

\`\`\`bash
npm run dev
\`\`\`

Приложение будет доступно по адресу: http://localhost:3000

## Сборка и деплой

\`\`\`bash
# Сборка для продакшена
npm run build

# Генерация статичных файлов
npm run generate

# Запуск через Docker
docker-compose up -d
\`\`\`

## Проверка работы

1. Откройте http://localhost:3000
2. Проверьте консоль разработчика на ошибки
3. Запустите тесты: \`npm run test\`

## Следующие шаги

- [Архитектура проекта](architecture.md)
- [Стили и BEM](styling.md)
- [Тестирование компонентов](testing.md)
