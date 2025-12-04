# Быстрый запуск GKEYS Store

## Вариант 1: С PostgreSQL (рекомендуется)

### Шаг 1: Запустить PostgreSQL

**Через Docker (если установлен):**
```bash
docker run --name gkeys-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=gkeys_store \
  -p 5432:5432 \
  -d postgres:15
```

**Через Homebrew (macOS):**
```bash
brew install postgresql@15
brew services start postgresql@15
createdb gkeys_store
```

### Шаг 2: Применить миграции и заполнить данными

```bash
cd backend
npm run prisma:migrate
npm run prisma:seed
```

### Шаг 3: Запустить серверы

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```

### Шаг 4: Открыть приложение

Откройте в браузере: http://localhost:5173

---

## Вариант 2: Без базы данных (Mock данные)

Если PostgreSQL недоступен, приложение будет работать с mock данными.

Просто запустите:

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend  
cd backend
npm run dev
```

Backend автоматически использует mock данные, если база данных недоступна.

---

## Тестовые аккаунты

После применения seed данных:

- **Администратор:**
  - Email: `admin@gkeys.store`
  - Password: `admin123`

- **Пользователь:**
  - Email: `test@example.com`
  - Password: `password123`
  - Баланс: 100.00 EUR

---

## Проверка работы

### Frontend
- Откройте: http://localhost:5173
- Должна загрузиться главная страница с играми

### Backend API
```bash
curl http://localhost:3001/health
# Должен вернуть: {"status":"ok","timestamp":"..."}

curl http://localhost:3001/api/games
# Должен вернуть список игр
```

---

## Troubleshooting

### Ошибка подключения к базе данных

1. Убедитесь, что PostgreSQL запущен:
   ```bash
   # Docker
   docker ps | grep postgres
   
   # Homebrew
   brew services list | grep postgresql
   ```

2. Проверьте DATABASE_URL в `backend/.env`

3. Попробуйте подключиться:
   ```bash
   psql -U postgres -d gkeys_store -c "SELECT 1;"
   ```

### Порт уже занят

Измените порт в:
- Frontend: `vite.config.ts`
- Backend: `backend/.env` (PORT=3001)

### Миграции не применяются

```bash
cd backend
npx prisma migrate reset  # Осторожно: удалит все данные!
npx prisma migrate dev
npm run prisma:seed
```

