# G2A Sandbox Setup Guide

Руководство по настройке тестовых credentials G2A и переключению на sandbox API для тестирования.

## Что такое G2A Sandbox?

G2A Sandbox - это тестовое окружение G2A API, которое позволяет тестировать интеграцию без реальных транзакций. Sandbox использует тестовые данные и не выполняет реальные покупки.

## Получение тестовых credentials

### Метод 1: Pre-defined Test Credentials (Быстрый старт)

G2A предоставляет предопределенные тестовые credentials для быстрого старта:

- **Test Client Id (G2A_API_HASH)**: `qdaiciDiyMaTjxMt`
- **Test Api Key (G2A_API_KEY)**: `74026b3dc2c6db6a30a73e71cdb138b1e1b5eb7a97ced46689e2d28db1050875`

Эти credentials можно использовать сразу для тестирования.

### Метод 2: Generated Credentials (Рекомендуется)

Для более реалистичного тестирования рекомендуется сгенерировать собственные credentials:

1. Войдите в [G2A Seller Panel](https://www.g2a.com/cooperation/api-integration/)
2. Перейдите в раздел **API Integration**
3. Откройте вкладку **SANDBOX**
4. Скопируйте сгенерированные credentials:
   - **Client ID** → это будет `G2A_API_HASH`
   - **Client Secret** → это будет `G2A_API_KEY` (или наоборот, проверьте в документации)

## Настройка переменных окружения

### Для локальной разработки (.env)

Создайте или обновите файл `.env` в корне проекта:

```bash
# G2A Sandbox Configuration
G2A_API_URL=https://sandboxapi.g2a.com/v1
G2A_API_KEY=74026b3dc2c6db6a30a73e71cdb138b1e1b5eb7a97ced46689e2d28db1050875
G2A_API_HASH=qdaiciDiyMaTjxMt
G2A_ENV=sandbox

# Опционально
G2A_TIMEOUT_MS=8000
G2A_RETRY_MAX=2
```

### Для Vercel (Production/Preview)

1. Откройте Vercel Dashboard → Ваш проект → Settings → Environment Variables
2. Добавьте или обновите следующие переменные:

**Для Sandbox (тестирование)**:
```
G2A_API_URL=https://sandboxapi.g2a.com/v1
G2A_API_KEY=74026b3dc2c6db6a30a73e71cdb138b1e1b5eb7a97ced46689e2d28db1050875
G2A_API_HASH=qdaiciDiyMaTjxMt
G2A_ENV=sandbox
```

**Для Production (после тестирования)**:
```
G2A_API_URL=https://api.g2a.com/integration-api/v1
G2A_API_KEY=your-production-api-key
G2A_API_HASH=your-production-api-hash
G2A_ENV=live
```

## Разница между Sandbox и Production

### Sandbox API

- **URL**: `https://sandboxapi.g2a.com/v1`
- **Аутентификация**: Упрощенная (Authorization header: `"{hash}, {key}"`)
- **Данные**: Тестовые продукты и транзакции
- **Транзакции**: Не выполняются реально, только симуляция
- **Использование**: Для разработки и тестирования

### Production API

- **URL**: `https://api.g2a.com/integration-api/v1`
- **Аутентификация**: Hash-based с timestamp
- **Данные**: Реальные продукты и транзакции
- **Транзакции**: Выполняются реально
- **Использование**: Для production окружения

## Проверка настройки

### 1. Проверка переменных окружения

Убедитесь, что все переменные установлены:

```bash
# В backend директории
cd backend
node -e "
  const required = ['G2A_API_URL', 'G2A_API_KEY', 'G2A_API_HASH', 'G2A_ENV'];
  const missing = required.filter(v => !process.env[v]);
  if (missing.length) {
    console.error('❌ Отсутствуют:', missing.join(', '));
    process.exit(1);
  }
  console.log('✅ Все G2A переменные установлены');
  console.log('G2A_API_URL:', process.env.G2A_API_URL);
  console.log('G2A_ENV:', process.env.G2A_ENV);
"
```

### 2. Проверка подключения к Sandbox

Запустите тест подключения:

```bash
# В backend директории
npm run test:g2a
# или
node scripts/test-g2a.ts
```

### 3. Проверка в логах

После запуска приложения проверьте логи:

- ✅ **Успешно**: `[G2A] Creating G2A API client` с `isSandbox: true`
- ✅ **Успешно**: `baseURL: 'https://sandboxapi.g2a.com/v1'`
- ❌ **Ошибка**: `baseURL: 'https://api.g2a.com/integration-api/v1'` (production вместо sandbox)

## Переключение между Sandbox и Production

### Переключение на Sandbox

1. Установите переменные окружения (см. выше)
2. Убедитесь что `G2A_ENV=sandbox`
3. Убедитесь что `G2A_API_URL=https://sandboxapi.g2a.com/v1`
4. Перезапустите приложение

### Переключение на Production

**⚠️ ВНИМАНИЕ**: Переключайтесь на production только после полного тестирования в sandbox!

1. Получите production credentials из G2A Seller Panel
2. Обновите переменные окружения:
   - `G2A_API_URL=https://api.g2a.com/integration-api/v1`
   - `G2A_API_KEY=your-production-api-key`
   - `G2A_API_HASH=your-production-api-hash`
   - `G2A_ENV=live`
3. Перезапустите приложение
4. Проверьте логи - должно быть `isSandbox: false`

## Troubleshooting

### Проблема: Используется production API вместо sandbox

**Симптомы**:
- В логах видно `baseURL: 'https://api.g2a.com/integration-api/v1'`
- Ошибки аутентификации

**Решение**:
1. Проверьте `G2A_API_URL` - должно быть `https://sandboxapi.g2a.com/v1`
2. Проверьте `G2A_ENV` - должно быть `sandbox`
3. Убедитесь что переменные установлены для правильного окружения в Vercel
4. Передеплойте проект

### Проблема: Ошибки 401 (Unauthorized)

**Симптомы**:
- `401 Unauthorized` в логах G2A API
- Ошибки аутентификации

**Решение**:
1. Проверьте что `G2A_API_KEY` и `G2A_API_HASH` правильные
2. Убедитесь что credentials для sandbox (не production)
3. Проверьте что используется правильный URL (sandbox vs production)
4. Для sandbox используется упрощенная аутентификация - проверьте что код правильно определяет sandbox

### Проблема: Ошибки 404 (Not Found)

**Симптомы**:
- `404 Not Found` на endpoints `/products/{id}/stock` или `/products/prices`

**Решение**:
- Эти endpoints не существуют в G2A API
- Используйте `GET /products/{id}` для получения информации о продукте (включая stock и price)
- Код уже исправлен для использования правильных endpoints

### Проблема: Неправильная аутентификация для sandbox

**Симптомы**:
- Ошибки аутентификации в sandbox
- Код использует hash-based auth вместо простого Authorization header

**Решение**:
1. Проверьте что `G2A_API_URL` содержит `sandboxapi.g2a.com`
2. Код автоматически определяет sandbox и использует упрощенную аутентификацию
3. Проверьте логи - должно быть `authMethod: 'Authorization header'` для sandbox

## Важные замечания

### ⚠️ Не используйте production API для тестирования!

- Всегда используйте sandbox для разработки и тестирования
- Production API выполняет реальные транзакции
- Используйте production только после полного тестирования

### ⚠️ Не коммитьте credentials в Git!

- Никогда не добавляйте `.env` файлы в Git
- Используйте `.gitignore` для исключения `.env` файлов
- Храните credentials только в переменных окружения

### ⚠️ Разные credentials для sandbox и production

- Sandbox и production используют разные credentials
- Не используйте sandbox credentials в production
- Не используйте production credentials в sandbox

## Дополнительные ресурсы

- [ENVIRONMENT_VARIABLES.md](ENVIRONMENT_VARIABLES.md) - Полный справочник переменных окружения
- [ENV_FIX_ACTIONS.md](ENV_FIX_ACTIONS.md) - Инструкции по исправлению переменных
- [G2A API Documentation](https://www.g2a.com/integration-api/documentation/) - Официальная документация G2A API

---

**Последнее обновление**: 2024-12-23

