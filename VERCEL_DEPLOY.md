# Деплой на Vercel

## Подготовка

Проект готов к деплою на Vercel. Frontend собран успешно.

## Шаги деплоя

### 1. Подготовка репозитория

```bash
git add .
git commit -m "Initial commit: GKEYS Store ready for deployment"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Деплой на Vercel

#### Вариант A: Через Vercel Dashboard

1. Зайдите на [vercel.com](https://vercel.com)
2. Нажмите "New Project"
3. Импортируйте ваш GitHub репозиторий
4. Настройки:
   - **Framework Preset**: Vite
   - **Root Directory**: `.` (корень проекта)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Добавьте Environment Variables (см. ниже)
6. Нажмите "Deploy"

#### Вариант B: Через Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

### 3. Environment Variables

В настройках проекта Vercel добавьте:

**Для Frontend:**
```
VITE_API_URL=https://your-backend-url.vercel.app/api
```

**Для Backend (если деплоите отдельно):**
```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
PORT=3001
CORS_ORIGIN=https://your-frontend-url.vercel.app
NODE_ENV=production
```

### 4. Настройка Backend API

Backend можно задеплоить отдельно как Vercel Serverless Functions или использовать отдельный сервер.

Для Serverless Functions:
- Создайте отдельный проект Vercel для backend
- Или используйте `api/` директорию в корне проекта

## Структура для Vercel

```
gkeys2/
├── dist/              # Frontend build (деплоится)
├── api/               # Serverless functions (опционально)
├── vercel.json        # Конфигурация Vercel
└── package.json       # С `vercel-build` скриптом
```

## Проверка деплоя

После деплоя проверьте:
- ✅ Frontend доступен по URL Vercel
- ✅ API endpoints работают (если настроены)
- ✅ Environment variables установлены
- ✅ База данных подключена (если используется)

## Troubleshooting

### Build fails
- Проверьте логи в Vercel Dashboard
- Убедитесь, что все зависимости в `package.json`
- Проверьте `vercel.json` конфигурацию

### API не работает
- Убедитесь, что backend задеплоен
- Проверьте CORS настройки
- Проверьте environment variables

### Environment variables
- Все переменные должны быть установлены в Vercel Dashboard
- Переменные с префиксом `VITE_` доступны в frontend
- Остальные доступны только в backend

