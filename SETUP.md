# Настройка и запуск GKEYS Store

## Требования

- Node.js >= 20.0.0
- PostgreSQL 15+ (или Docker)
- npm или yarn

## Быстрый старт

### 1. Установка зависимостей

```bash
# Frontend
npm install

# Backend
cd backend
npm install
```

### 2. Настройка базы данных

#### Вариант A: Использование Docker (рекомендуется)

```bash
# Запустить PostgreSQL контейнер
docker run --name gkeys-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=gkeys_store \
  -p 5432:5432 \
  -d postgres:15

# Если контейнер уже существует, просто запустите его
docker start gkeys-postgres
```

#### Вариант B: Локальный PostgreSQL

Убедитесь, что PostgreSQL запущен и создайте базу данных:

```bash
createdb gkeys_store
# или через psql:
# psql -U postgres
# CREATE DATABASE gkeys_store;
```

### 3. Настройка переменных окружения

Файл `backend/.env` уже создан с настройками по умолчанию:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/gkeys_store?schema=public"
PORT=3001
JWT_SECRET="your-secret-key"
```

### 4. Генерация Prisma клиента и миграции

```bash
cd backend

# Генерация Prisma клиента
npm run prisma:generate

# Создание миграций и применение к базе данных
npm run prisma:migrate

# (Опционально) Заполнение тестовыми данными
npm run prisma:seed
```

### 5. Запуск серверов

#### Frontend (в корне проекта)

```bash
npm run dev
```

Frontend будет доступен на: http://localhost:5173

#### Backend (в директории backend)

```bash
cd backend
npm run dev
```

Backend API будет доступен на: http://localhost:3001

## Проверка работы

### Frontend
Откройте в браузере: http://localhost:5173

### Backend Health Check
```bash
curl http://localhost:3001/health
```

Должен вернуть: `{"status":"ok","timestamp":"..."}`

## Структура проекта

```
gkeys2/
├── src/              # Frontend (React + TypeScript)
├── backend/          # Backend (Express + TypeScript)
│   ├── src/
│   │   ├── routes/   # API маршруты
│   │   ├── services/ # Бизнес-логика
│   │   ├── controllers/ # Контроллеры
│   │   └── ...
│   └── prisma/       # Prisma schema и миграции
└── package.json
```

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/login` - Вход
- `GET /api/games` - Список игр
- `GET /api/games/:id` - Детали игры
- И другие...

## Troubleshooting

### Ошибка подключения к базе данных

1. Убедитесь, что PostgreSQL запущен:
   ```bash
   # Docker
   docker ps | grep postgres
   
   # Локально
   pg_isready
   ```

2. Проверьте DATABASE_URL в `backend/.env`

3. Убедитесь, что база данных создана:
   ```bash
   psql -U postgres -l | grep gkeys_store
   ```

### Ошибки миграций

Если миграции не применяются:

```bash
cd backend
npx prisma migrate reset  # Осторожно: удалит все данные!
npx prisma migrate dev
```

### Порт уже занят

Измените порт в:
- Frontend: `vite.config.ts`
- Backend: `backend/.env` (PORT=3001)

## Дополнительные команды

```bash
# Prisma Studio (GUI для базы данных)
cd backend
npm run prisma:studio

# Сборка для production
npm run build          # Frontend
cd backend && npm run build  # Backend
```

