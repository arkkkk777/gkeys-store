# Локальный запуск GKEYS Store

## Текущий статус

✅ **Frontend**: http://localhost:5173 - Работает
✅ **Backend API**: http://localhost:3001 - Работает

⚠️ **База данных**: Требуется настройка

## Быстрая настройка базы данных

### Шаг 1: Запустить PostgreSQL

Выберите один из вариантов:

**Вариант A - Docker (рекомендуется):**
```bash
docker run --name gkeys-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=gkeys_store \
  -p 5432:5432 \
  -d postgres:15
```

**Вариант B - Homebrew (macOS):**
```bash
brew services start postgresql@15
createdb gkeys_store
```

### Шаг 2: Настроить базу данных

```bash
cd backend
./setup-db.sh
```

Или вручную:
```bash
cd backend
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

### Шаг 3: Проверить работу

Откройте в браузере: **http://localhost:5173**

## Тестовые данные

После применения seed:

- **8 тестовых игр** (Metro Exodus, Fallout, Mad Max, Days Gone, Bioshock, Detroit, ARC Raiders, The Witcher 3)
- **2 пользователя:**
  - Admin: `admin@gkeys.store` / `admin123`
  - User: `test@example.com` / `password123` (баланс: 100 EUR)

## API Endpoints

- Health: http://localhost:3001/health
- Games: http://localhost:3001/api/games
- Auth: http://localhost:3001/api/auth/login

## Документация

- `QUICK_START.md` - Быстрый старт
- `SETUP.md` - Детальная настройка
