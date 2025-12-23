# E2E Test Checklist

## 1. Auth Flow (Backend + Frontend)

1. **Registration**
   - Open frontend (`http://localhost:5173`), go to **Sign Up**.
   - Register with new email + strong password.
   - Expect: success message, auto-login or redirect; in backend logs — no errors.
2. **Login**
   - Logout if logged in.
   - Login with same credentials.
   - Expect: redirect to dashboard/home, JWT stored (cookie/localStorage depending on impl).
3. **Token Refresh**
   - Keep page open > 1h or manually call `/api/auth/refresh` from client.
   - Expect: new token issued; protected requests continue работать без 401.

## 2. Basic Store Flow

1. **Catalog**
   - Открыть каталог, убедиться что игры подтягиваются с backend (Network → `/api/games`).
2. **Wishlist**
   - Добавить игру в wishlist.
   - Перейти в страницу wishlist; элемент должен отображаться.
3. **Cart + Order Creation**
   - Добавить игру в cart.
   - Оформить заказ (по доступному платежному сценарию — даже если это "fake" метод).
   - Проверить в БД (через Prisma Studio) что создан `Order` и `OrderItem`.

## 3. G2A Integration

1. **Admin G2A Status**
   - Запрос: `GET /api/admin/g2a/status` c admin JWT.
   - Ожидается: информация о количестве продуктов, последнем sync.
2. **Sync Job**
   - Запрос: `POST /api/admin/g2a/sync` (admin JWT).
   - Проверить: log-и job, рост количества `Game` с заполненным `g2aProductId`.
3. **G2A Metrics**
   - Запрос: `GET /api/admin/g2a/metrics` (admin JWT).
   - Ожидается: счётчики запросов, webhook, latency статистика.
4. **Webhook (Sandbox)**
   - Отправить тестовый webhook на `POST /api/g2a/webhook` с корректной подписью.
   - Проверить: статус заказа обновился, метрики webhook выросли, повторный запрос с тем же `event_id` не дублирует изменения.

## 4. Health & Observability

1. **/health**
   - `GET /health` → `status: ok`, `checks.database/redis/g2a: ok`.
2. **Logs**
   - Убедиться, что в логах нет G2A ключей/хэшей.
3. **DB Checks**
   - `npm run db:check` — успешное выполнение без ошибок.

## 5. Negative Scenarios

1. **Wrong Password**
   - Логин с неверным паролем → `401 Invalid email or password`.
2. **No Token on Protected Route**
   - `GET /api/user/profile` без `Authorization` → `401 No token provided`.
3. **Broken G2A URL**
   - Временно задать неверный `G2A_API_URL` и проверить, что `/health` показывает `g2a: error`, а ошибки логируются без секретов.
