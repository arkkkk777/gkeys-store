# GKEYS Store Backend API

Backend API для GKEYS Store на Node.js + Express + TypeScript + Prisma.

## Установка

```bash
npm install
```

## Настройка

1. Скопируйте `.env.example` в `.env`
2. Заполните все необходимые переменные окружения
3. Настройте PostgreSQL базу данных

## Запуск

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start
```

## Prisma

```bash
# Генерация Prisma Client
npm run prisma:generate

# Миграции
npm run prisma:migrate

# Seed данные
npm run prisma:seed

# Prisma Studio (GUI для БД)
npm run prisma:studio
```

## Структура проекта

```
backend/
├── src/
│   ├── config/          # Конфигурация (DB, Redis, JWT)
│   ├── controllers/      # Контроллеры
│   ├── services/        # Бизнес-логика
│   ├── middleware/      # Middleware
│   ├── routes/          # API routes
│   ├── types/           # TypeScript типы
│   ├── utils/           # Утилиты
│   ├── validators/      # Валидация
│   └── index.ts         # Entry point
├── prisma/
│   ├── schema.prisma
│   └── migrations/
└── package.json
```

