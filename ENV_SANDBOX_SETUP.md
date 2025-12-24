# Быстрая настройка G2A Sandbox

Краткая инструкция по настройке тестовых credentials G2A для запуска проекта.

## Тестовые credentials (из документации)

Используйте эти credentials для быстрого старта:

```
G2A_API_URL=https://sandboxapi.g2a.com/v1
G2A_API_KEY=74026b3dc2c6db6a30a73e71cdb138b1e1b5eb7a97ced46689e2d28db1050875
G2A_API_HASH=qdaiciDiyMaTjxMt
G2A_ENV=sandbox
```

## Действия для настройки

### 1. Локальная разработка

Создайте файл `.env` в корне проекта или обновите существующий:

```bash
# Добавьте эти строки в .env
G2A_API_URL=https://sandboxapi.g2a.com/v1
G2A_API_KEY=74026b3dc2c6db6a30a73e71cdb138b1e1b5eb7a97ced46689e2d28db1050875
G2A_API_HASH=qdaiciDiyMaTjxMt
G2A_ENV=sandbox
```

### 2. Vercel (если деплоите)

1. Откройте Vercel Dashboard → Ваш проект → Settings → Environment Variables
2. Добавьте или обновите переменные:
   - `G2A_API_URL` = `https://sandboxapi.g2a.com/v1`
   - `G2A_API_KEY` = `74026b3dc2c6db6a30a73e71cdb138b1e1b5eb7a97ced46689e2d28db1050875`
   - `G2A_API_HASH` = `qdaiciDiyMaTjxMt`
   - `G2A_ENV` = `sandbox`
3. Сохраните и передеплойте проект

## Проверка

После настройки проверьте логи приложения:

✅ **Правильно**:
```
[G2A] Creating G2A API client
baseURL: 'https://sandboxapi.g2a.com/v1'
isSandbox: true
authMethod: 'Authorization header'
```

❌ **Неправильно** (production вместо sandbox):
```
baseURL: 'https://api.g2a.com/integration-api/v1'
isSandbox: false
```

## Что исправлено

1. ✅ Endpoint для stock: теперь используется `GET /products/{id}` вместо несуществующего `/products/{id}/stock`
2. ✅ Endpoint для цен: теперь используются индивидуальные запросы `GET /products/{id}` вместо несуществующего `POST /products/prices`
3. ✅ Поддержка sandbox: код автоматически определяет sandbox и использует правильную аутентификацию

## Redis (рекомендуется)

Для production рекомендуется добавить Redis для idempotency, метрик и кеширования:

```
REDIS_GKEYS_REDIS_URL=redis://default:S0uqFAzNdrWOFeWYcGbQFcpmu6E3jAmu@redis-16640.c15.us-east-1-4.ec2.cloud.redislabs.com:16640
```

**Примечание**: Код поддерживает как `REDIS_GKEYS_REDIS_URL`, так и `REDIS_URL`. Если установлены обе переменные, `REDIS_GKEYS_REDIS_URL` имеет приоритет.

## Следующие шаги

1. Настройте переменные окружения (см. выше)
2. Добавьте Redis URL (рекомендуется)
3. Запустите проект
4. Проверьте логи - не должно быть 404 ошибок
5. Проверьте что используется sandbox API
6. Проверьте что Redis подключен: `✅ Redis connected` в логах

Подробная документация: [G2A_SANDBOX_SETUP.md](G2A_SANDBOX_SETUP.md)

