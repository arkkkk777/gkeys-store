# Информация о деплое на Vercel

## Статус деплоя

✅ **Деплой успешно запущен!**

## Ссылки

- **Production URL**: https://gkeys2-px8w9e4yi-deffgods-projects.vercel.app
- **Inspect URL**: https://vercel.com/deffgods-projects/gkeys2/21annzLPqRy5KzSu44GH1vmJMN5x

## Конфигурация

Проект настроен для деплоя на Vercel с следующими параметрами:

- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: >=20.0.0

## Environment Variables

Для работы приложения необходимо настроить следующие переменные окружения в Vercel Dashboard:

### Frontend
```
VITE_API_BASE_URL=https://your-backend-api-url.com/api
```

**Important**: The `/api` suffix is required as all backend routes are prefixed with `/api`.

### Настройка в Vercel Dashboard

1. Перейдите в настройки проекта: https://vercel.com/deffgods-projects/gkeys2/settings
2. Откройте раздел "Environment Variables"
3. Добавьте переменные окружения
4. Перезапустите деплой после добавления переменных

## Проверка деплоя

После завершения деплоя проверьте:

1. ✅ Frontend доступен по Production URL
2. ✅ Все страницы загружаются корректно
3. ✅ API запросы работают (если настроен backend)
4. ✅ Environment variables установлены

## Следующие шаги

1. Настройте Environment Variables в Vercel Dashboard
2. Проверьте работу приложения на Production URL
3. Настройте домен (опционально) в настройках проекта
4. Настройте автоматический деплой из Git (если нужно)

## Команды для управления деплоем

```bash
# Просмотр всех деплоев
vercel ls

# Просмотр production деплоев
vercel ls --prod

# Просмотр логов последнего деплоя
vercel logs

# Открыть проект в браузере
vercel open

# Удалить деплой
vercel remove
```

## Troubleshooting

Если деплой не работает:

1. Проверьте логи в Vercel Dashboard
2. Убедитесь, что все зависимости установлены
3. Проверьте, что `vercel.json` настроен правильно
4. Убедитесь, что build проходит успешно локально
