# Research: Расширенный поиск и фильтры

**Feature**: 001-advanced-search-filters  
**Date**: 2024-12-05

## Research Summary

Все технические решения приняты на основе существующей архитектуры проекта, принципов конституции и требований спецификации. Нет неразрешенных вопросов (NEEDS CLARIFICATION).

## 1. Framer Motion Tabs Component Integration

**Decision**: Интегрировать предоставленный анимированный компонент Tabs с Framer Motion в проект.

**Rationale**: 
- Компонент уже предоставлен пользователем и готов к использованию
- Использует существующую зависимость Framer Motion 12.23.25
- Соответствует принципу UX консистентности (плавные анимации)
- Может быть использован для улучшения UI фильтров (табы для категорий фильтров)

**Alternatives Considered**:
- **Стандартный shadcn tabs**: Отклонен - не имеет нужной анимации и визуального эффекта
- **Создание собственного компонента**: Отклонен - предоставленный компонент уже готов и протестирован
- **Использование существующего tabs.tsx**: Отклонен - существующий компонент основан на Radix UI и не имеет анимации

**Integration Requirements**:
- Заменить или дополнить `src/components/ui/tabs.tsx`
- Адаптировать цвета: использовать accent color `#b4ff00` вместо стандартных
- Удалить зависимость от Next.js Image, использовать стандартный `img` или оптимизированные изображения
- Адаптировать для темной темы проекта (#0D0D0D background)

**Implementation Notes**:
- Компонент использует `"use client"` директиву (Next.js), но в Vite это не требуется - можно удалить
- Использовать `cn()` из `@/lib/utils` для className merging
- Адаптировать dark mode стили под дизайн-систему проекта

## 2. Autocomplete API Design

**Decision**: RESTful endpoint `/api/games/autocomplete?q={query}&limit=10` с debouncing на клиенте (300ms).

**Rationale**:
- Простой и эффективный подход
- Соответствует существующей REST архитектуре проекта
- Debouncing на клиенте снижает нагрузку на сервер
- Легко кэшировать и оптимизировать

**Alternatives Considered**:
- **GraphQL**: Отклонен - проект использует REST API, GraphQL потребует значительных изменений
- **WebSocket для real-time**: Отклонен - избыточен для autocomplete, добавляет сложность
- **Server-side debouncing**: Отклонен - клиентское debouncing более эффективно для UX

**Implementation Details**:
- Минимум 2 символа для запроса
- Поиск по полям: title, description (case-insensitive)
- Сортировка по релевантности (title matches выше description matches)
- Лимит результатов: 10 по умолчанию
- Индексация: рассмотреть добавление индекса на title для производительности

**Performance Considerations**:
- Кэширование результатов на 30 секунд
- Оптимизация запросов к БД (использование LIKE с индексами)
- Rate limiting для предотвращения злоупотреблений

## 3. LocalStorage Structure for Saved Filters

**Decision**: JSON структура в browser localStorage с ключом `gkeys_saved_filters`.

**Rationale**:
- Простота реализации - не требует backend изменений
- Персистентность между сессиями
- Достаточная для хранения фильтров (обычно < 10KB)
- Не требует аутентификации пользователя

**Alternatives Considered**:
- **Backend storage**: Отклонен - требует аутентификации, усложняет архитектуру, не критично для MVP
- **IndexedDB**: Отклонен - избыточен для простых JSON данных фильтров
- **SessionStorage**: Отклонен - фильтры должны сохраняться между сессиями

**Data Structure**:
```typescript
interface SavedFiltersStorage {
  filters: Array<{
    id: string;              // UUID v4
    name: string;             // User-defined name
    filters: FilterState;     // Complete filter configuration
    createdAt: number;        // Timestamp
    lastUsed?: number;        // Optional: last usage timestamp
  }>;
}
```

**Storage Limits**:
- Максимум 10 сохраненных наборов фильтров на пользователя
- Автоматическое удаление старых при превышении лимита
- Размер каждого набора: ~1-2KB (в пределах лимита localStorage)

**Error Handling**:
- Graceful fallback если localStorage недоступен
- Валидация данных при загрузке
- Миграция структуры при изменениях

## 4. Search History Implementation

**Decision**: localStorage с ключом `gkeys_search_history`, массив строк до 10 элементов.

**Rationale**:
- Простота и эффективность
- Персистентность между сессиями
- Не требует backend
- Минимальный размер данных

**Alternatives Considered**:
- **Backend storage**: Отклонен - не критично, усложняет архитектуру
- **SessionStorage**: Отклонен - история должна сохраняться между сессиями
- **IndexedDB**: Отклонен - избыточен для простого массива строк

**Data Structure**:
```typescript
type SearchHistory = string[]; // Max 10 elements, FIFO
```

**Implementation Logic**:
- Добавление нового запроса в начало массива
- Удаление дубликатов
- Ограничение до 10 элементов (удаление старых)
- Автоматическая очистка при превышении

**Privacy Considerations**:
- Пользователь может очистить историю
- Данные хранятся только локально (не отправляются на сервер)
- Соответствует принципам приватности

## 5. Extended Filters Data Model

**Decision**: Добавить поля rating, releaseDate, languages в существующую модель Game через Prisma миграцию.

**Rationale**:
- Расширяет существующую модель без breaking changes
- Позволяет эффективную фильтрацию на уровне БД
- Соответствует принципам нормализации данных
- Легко индексировать для производительности

**Alternatives Considered**:
- **Отдельная таблица GameMetadata**: Отклонен - усложняет JOIN запросы, избыточно
- **JSON поле**: Отклонен - усложняет фильтрацию и индексацию в PostgreSQL
- **Внешний API для метаданных**: Отклонен - добавляет зависимость и задержку

**New Fields**:
```prisma
model Game {
  // ... existing fields
  ratingCritic    Int?      // 0-100, optional
  ratingUser      Int?      // 0-100, optional
  releaseDate      DateTime? // Release date
  languages       String[]  // Array of language codes (ISO 639-1)
}
```

**Migration Strategy**:
- Создать миграцию Prisma
- Заполнить существующие игры дефолтными значениями (null для optional полей)
- Добавить индексы для производительности фильтрации

**Data Sources**:
- Rating: из существующих данных или внешних API (Steam, Metacritic)
- Release Date: из существующих данных игр
- Languages: из метаданных игр или API платформ

## 6. Component Integration Strategy

**Decision**: Создать новый компонент `advanced-filters.tsx` и постепенно интегрировать в CatalogPage с сохранением обратной совместимости.

**Rationale**:
- Минимизирует риск для существующей функциональности
- Позволяет постепенное развертывание
- Сохраняет возможность отката
- Соответствует принципу компонентной архитектуры

**Alternatives Considered**:
- **Полная замена CatalogPage**: Отклонен - слишком рискованно, может сломать существующую функциональность
- **Отдельная страница AdvancedCatalog**: Отклонен - нарушает UX, создает фрагментацию
- **Feature flags**: Рассмотрено, но не требуется для MVP

**Integration Approach**:
1. Создать новые компоненты как отдельные модули
2. Интегрировать в CatalogPage через условный рендеринг
3. Сохранить существующие фильтры как fallback
4. Постепенно мигрировать функциональность

**File Structure**:
```
src/components/
├── ui/
│   ├── tabs.tsx                    # Animated Tabs (NEW)
│   ├── search-autocomplete.tsx     # Autocomplete (NEW)
│   └── filter-manager.tsx           # Saved filters UI (NEW)
└── catalog/
    └── advanced-filters.tsx         # Enhanced filters (NEW)
```

## 7. Performance Optimization Strategy

**Decision**: Использовать debouncing, memoization, code splitting для оптимизации производительности.

**Rationale**:
- Соответствует принципам конституции (Performance Optimization)
- Обеспечивает достижение целевых метрик (SC-001 до SC-010)
- Минимизирует влияние на bundle size

**Implementation**:
- **Debouncing**: 300ms для autocomplete (useDebounce hook)
- **Memoization**: useMemo для фильтрованных списков, useCallback для handlers
- **Code Splitting**: Lazy loading для advanced-filters компонента
- **Caching**: 30 секунд кэш для autocomplete результатов

## 8. Accessibility Considerations

**Decision**: Полная поддержка клавиатурной навигации, ARIA labels, screen reader compatibility.

**Rationale**:
- Соответствует принципу UX Consistency (Accessibility)
- Требование конституции
- Улучшает пользовательский опыт для всех пользователей

**Implementation**:
- Keyboard navigation для autocomplete (Arrow keys, Enter, Escape)
- ARIA labels для всех интерактивных элементов
- Focus management при открытии/закрытии dropdowns
- Semantic HTML структура

## Conclusion

Все технические решения приняты на основе:
- Существующей архитектуры проекта
- Принципов конституции
- Требований спецификации
- Best practices для React/TypeScript приложений

Нет неразрешенных вопросов. План готов к реализации.
