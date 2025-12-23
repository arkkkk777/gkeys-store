# CI Setup Recommendations

## Suggested CI Steps (backend)

In your CI pipeline (GitHub Actions, GitLab CI, etc.) for `backend/`:

```yaml
- name: Install dependencies
  run: npm ci

- name: Generate Prisma client
  run: npm run prisma:generate

- name: Lint
  run: npm run lint

- name: Build
  run: npm run build

- name: DB Check (optional, if CI has DB)
  env:
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
    DIRECT_URL: ${{ secrets.DIRECT_URL }}
  run: npm run db:check

- name: Basic Integration Tests (auth + health)
  run: |
    npm run dev &
    sleep 10
    curl -f http://localhost:3001/health
    curl -f -X POST http://localhost:3001/api/auth/register \
      -H "Content-Type: application/json" \
      -d '{"email":"ci-'"$(date +%s)'"@example.com","password":"Test1234","nickname":"CIUser"}'
``` 

## Env Separation

- Use **different** `DATABASE_URL` / `G2A_*` values per env:
  - `development`: local Postgres + G2A sandbox
  - `staging`: managed Postgres + G2A sandbox
  - `production`: managed Postgres + G2A live (минимизировать опасные операции)

Store all secrets in CI secret storage (GitHub Secrets, GitLab Variables) — не коммитить `.env`.

## Smoke Checks Before Deploy

1. `npm run build`
2. `npm run db:check`
3. `curl /health` against staging
4. E2E smoke from `E2E_TEST_CHECKLIST.md` (минимальный сценарий: регистрация → логин → профиль).
