# Implementation Plan: Расширенный поиск и фильтры

**Branch**: `001-advanced-search-filters` | **Date**: 2024-12-05 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-advanced-search-filters/spec.md`

## Summary

Реализация расширенной системы поиска и фильтров для каталога игр GKEYS Store. Функциональность включает: автодополнение поиска, сохранение/восстановление фильтров, расширенные фильтры (рейтинг, дата выхода, язык), историю поиска. Интеграция анимированного компонента Tabs для улучшения UX фильтров. Все компоненты должны быть полностью типизированы TypeScript, использовать существующую дизайн-систему проекта и соответствовать принципам производительности.

## Technical Context

**Language/Version**: TypeScript 5.9.3, React 19.2.0  
**Primary Dependencies**: React Router 7, Framer Motion 12.23.25, Tailwind CSS 3.4.18, shadcn/ui components  
**Storage**: Browser localStorage для сохраненных фильтров и истории поиска, PostgreSQL для игровых данных  
**Testing**: React Testing Library, Vitest (опционально)  
**Target Platform**: Web (Desktop, Tablet, Mobile - responsive)  
**Project Type**: Web application (frontend + backend)  
**Performance Goals**: 
- Автодополнение: < 300ms debounce delay
- Обновление результатов: < 1 секунда после применения фильтров
- Поддержка 50+ concurrent autocomplete requests
- Lighthouse Performance Score: > 90

**Constraints**: 
- Bundle size: < 1MB gzipped (новые компоненты должны быть code-split)
- Mobile-first responsive design (min width: 320px)
- Accessibility: WCAG 2.1 AA compliance
- Браузерная совместимость: Chrome, Firefox, Safari (последние 2 версии)

**Scale/Scope**: 
- Поддержка до 10 сохраненных наборов фильтров на пользователя
- История поиска: до 10 последних запросов
- Автодополнение: до 10 предложений за запрос
- Одновременное применение до 10 различных фильтров

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. Type Safety First ✅
- Все компоненты будут полностью типизированы TypeScript
- Использование строгих типов для props, state, API responses
- Нет `any` типов без обоснования

### II. Component-Driven Architecture ✅
- Модульные, переиспользуемые компоненты
- Single responsibility principle
- Независимо тестируемые компоненты
- Composition over inheritance
- Functional components с hooks

### III. Performance Optimization ✅
- Code splitting для новых компонентов
- Debouncing для autocomplete (300ms)
- Memoization с useMemo/useCallback где необходимо
- Lazy loading для тяжелых компонентов
- Удаление console/debugger в production

### IV. User Experience Consistency ✅
- Соответствие дизайн-системе (цвета: #00FF66 primary, #b4ff00 accent)
- Hover/focus states для всех интерактивных элементов
- Плавные анимации через Framer Motion
- Mobile-first responsive design
- ARIA labels, keyboard navigation, semantic HTML

### V. Code Quality Standards ✅
- Следование ESLint конфигурации
- Prettier для форматирования
- Осмысленные имена переменных и функций
- Комментарии только для сложной логики

**GATE STATUS**: ✅ PASS - Все принципы конституции соблюдены

## Project Structure

### Documentation (this feature)

```text
specs/001-advanced-search-filters/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
# Web application structure (existing)
src/
├── components/
│   ├── ui/
│   │   ├── tabs.tsx                    # NEW: Animated Tabs component (Framer Motion)
│   │   ├── tabs-demo.tsx               # NEW: Demo component for Tabs
│   │   ├── search-autocomplete.tsx     # NEW: Autocomplete component
│   │   ├── filter-manager.tsx          # NEW: Saved filters management
│   │   └── [existing shadcn components]
│   └── catalog/
│       └── advanced-filters.tsx        # NEW: Enhanced filters component
├── pages/
│   └── CatalogPage.jsx                 # MODIFY: Integrate new features
├── services/
│   └── gamesApi.ts                     # MODIFY: Add autocomplete endpoint
├── hooks/
│   ├── useSearchHistory.ts             # NEW: Search history hook
│   ├── useSavedFilters.ts              # NEW: Saved filters hook
│   └── useAutocomplete.ts              # NEW: Autocomplete hook
├── lib/
│   └── utils.ts                        # EXISTS: cn() function available
└── types/
    └── search.ts                       # NEW: TypeScript types for search/filters

backend/
├── src/
│   ├── routes/
│   │   └── game.routes.ts              # MODIFY: Add autocomplete endpoint
│   ├── services/
│   │   └── game.service.ts             # MODIFY: Add autocomplete logic
│   └── types/
│       └── game.ts                     # MODIFY: Add new filter types
```

**Structure Decision**: Используем существующую структуру проекта. Новые компоненты добавляются в `src/components/ui/` (соответствует shadcn структуре). Хуки для логики в `src/hooks/`. Типы в `src/types/`. Модификации существующих файлов минимальны для сохранения обратной совместимости.

## Complexity Tracking

> **No violations detected** - все решения соответствуют конституции проекта

## Phase 0: Outline & Research

### Research Tasks

1. **Framer Motion Tabs Component Integration**
   - Decision: Использовать предоставленный анимированный компонент Tabs с Framer Motion
   - Rationale: Компонент уже предоставлен пользователем, соответствует принципам UX (плавные анимации) и использует существующую зависимость Framer Motion
   - Alternatives considered: 
     - Стандартный shadcn tabs - отклонен, так как не имеет нужной анимации
     - Создание собственного - отклонен, так как предоставленный компонент уже готов
   - Integration points: 
     - Компонент будет размещен в `src/components/ui/tabs.tsx` (заменит существующий или будет дополнением)
     - Адаптация цветов под дизайн-систему (#b4ff00 accent color)
     - Удаление зависимости от Next.js Image (использовать обычный img или оптимизированные изображения)

2. **Autocomplete API Design**
   - Decision: RESTful endpoint `/api/games/autocomplete?q={query}&limit=10`
   - Rationale: Простой, эффективный, соответствует существующей архитектуре API
   - Alternatives considered:
     - GraphQL - отклонен, так как проект использует REST
     - WebSocket для real-time - отклонен, избыточен для autocomplete
   - Implementation: Debounced client-side requests (300ms), server-side поиск по title и description

3. **LocalStorage Structure for Saved Filters**
   - Decision: JSON структура в localStorage с ключом `gkeys_saved_filters`
   - Rationale: Простота, персистентность, не требует backend изменений
   - Alternatives considered:
     - Backend storage - отклонен, требует аутентификации и усложняет архитектуру
     - IndexedDB - отклонен, избыточен для простых данных
   - Structure:
     ```typescript
     {
       filters: Array<{
         id: string;
         name: string;
         filters: FilterState;
         createdAt: number;
       }>;
     }
     ```

4. **Search History Implementation**
   - Decision: localStorage с ключом `gkeys_search_history`, массив до 10 элементов
   - Rationale: Простота, персистентность, не требует backend
   - Alternatives considered:
     - Backend storage - отклонен по тем же причинам
     - SessionStorage - отклонен, история должна сохраняться между сессиями
   - Structure: Array<string> с автоматическим ограничением до 10 элементов

5. **Extended Filters Data Model**
   - Decision: Добавить поля rating, releaseDate, languages в существующую модель Game
   - Rationale: Расширяет существующую модель без breaking changes
   - Alternatives considered:
     - Отдельная таблица - отклонен, усложняет запросы
     - JSON поле - отклонен, усложняет фильтрацию
   - Backend changes required: Миграция Prisma для добавления полей

6. **Component Integration Strategy**
   - Decision: Создать новый компонент `advanced-filters.tsx` и интегрировать в CatalogPage
   - Rationale: Сохраняет существующую функциональность, добавляет новые возможности
   - Alternatives considered:
     - Полная замена CatalogPage - отклонен, слишком рискованно
     - Отдельная страница - отклонен, нарушает UX
   - Integration: Постепенная интеграция с feature flags для безопасного развертывания

## Phase 1: Design & Contracts

### Data Model

**File**: `data-model.md`

#### Entities

1. **SearchSuggestion**
   - `id: string` - Game ID
   - `title: string` - Game title
   - `image: string` - Thumbnail URL
   - `slug: string` - Game slug for navigation
   - `relevanceScore: number` - Calculated relevance (0-1)

2. **SavedFilterSet**
   - `id: string` - Unique identifier (UUID)
   - `name: string` - User-defined name
   - `filters: FilterState` - Complete filter configuration
   - `createdAt: number` - Timestamp
   - `lastUsed: number` - Last usage timestamp

3. **FilterState**
   - `platforms: string[]` - Selected platform slugs
   - `genres: string[]` - Selected genre slugs
   - `priceRange: { min: number, max: number }` - Price range
   - `pricePreset?: string` - Price preset value
   - `rating?: { min: number }` - Minimum rating
   - `releaseDate?: { from: number, to: number }` - Year range
   - `languages: string[]` - Selected language codes
   - `multiplayer?: boolean` - Multiplayer filter
   - `inStockOnly: boolean` - Stock filter
   - `searchQuery?: string` - Search text

4. **SearchHistoryEntry**
   - `query: string` - Search text
   - `timestamp: number` - When searched
   - `resultCount?: number` - Number of results (optional)

5. **Game (Extended)**
   - Existing fields: id, title, description, price, etc.
   - New fields:
     - `rating?: { critic: number, user: number }` - Ratings
     - `releaseDate: Date` - Release date
     - `languages: string[]` - Supported language codes
     - `ratingCritic?: number` - Critic rating (0-100)
     - `ratingUser?: number` - User rating (0-100)

### API Contracts

**Directory**: `contracts/`

#### 1. Autocomplete Endpoint

**GET** `/api/games/autocomplete`

**Query Parameters**:
- `q: string` (required) - Search query (min 2 characters)
- `limit: number` (optional, default: 10) - Maximum results

**Response** (200 OK):
```json
{
  "suggestions": [
    {
      "id": "string",
      "title": "string",
      "image": "string",
      "slug": "string",
      "relevanceScore": 0.95
    }
  ]
}
```

**Error Responses**:
- 400: Invalid query (less than 2 characters)
- 500: Server error

#### 2. Enhanced Games Endpoint

**GET** `/api/games` (existing, extended)

**New Query Parameters**:
- `ratingMin: number` - Minimum rating (0-100)
- `releaseDateFrom: number` - Start year
- `releaseDateTo: number` - End year
- `languages: string[]` - Language codes array

**Response**: Existing response format (unchanged)

### Quickstart Guide

**File**: `quickstart.md`

#### Development Setup

1. **Install Dependencies** (if not already installed):
   ```bash
   npm install framer-motion
   ```

2. **Component Integration**:
   - Copy animated Tabs component to `src/components/ui/tabs.tsx`
   - Adapt colors to use accent color `#b4ff00`
   - Remove Next.js Image dependency, use standard img tags

3. **Backend Setup**:
   - Run Prisma migration for new Game fields
   - Add autocomplete endpoint to game.routes.ts
   - Update game.service.ts with autocomplete logic

4. **Frontend Integration**:
   - Create new components in `src/components/ui/`
   - Create hooks in `src/hooks/`
   - Integrate into CatalogPage.jsx

#### Testing Checklist

- [ ] Autocomplete appears after 2+ characters
- [ ] Debounce works (300ms delay)
- [ ] Saved filters persist in localStorage
- [ ] Search history maintains max 10 entries
- [ ] Extended filters work correctly
- [ ] Mobile responsive design
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility

## Phase 2: Implementation Phases

### Phase 2.1: Component Integration (P1) ✅ COMPLETED

1. **Integrate Animated Tabs Component** ✅
   - ✅ Created `src/components/ui/tabs.tsx` with Framer Motion animations
   - ✅ Adapted for project (removed Next.js dependencies, using accent color #b4ff00)
   - ✅ Created demo component `src/components/ui/tabs-demo.tsx` for testing
   - ✅ Verified Framer Motion integration (already installed: 12.23.25)
   - ✅ Adapted colors to use accent color #b4ff00 for active states
   - ✅ Replaced Next.js Image with standard img tag
   - ✅ Dark theme compatibility ensured

2. **Create Base Autocomplete Component**
   - Implement `search-autocomplete.tsx`
   - Add debouncing logic (300ms)
   - Keyboard navigation support
   - Loading states

### Phase 2.2: Autocomplete Feature (P1)

3. **Backend Autocomplete Endpoint**
   - Add route to game.routes.ts
   - Implement service method
   - Add search indexing optimization

4. **Frontend Autocomplete Integration**
   - Connect component to API
   - Handle errors gracefully
   - Add loading indicators

### Phase 2.3: Saved Filters (P2)

5. **Saved Filters Hook**
   - Create `useSavedFilters.ts`
   - localStorage operations
   - Filter serialization/deserialization

6. **Filter Manager Component**
   - UI for saving/loading filters
   - Filter naming and deletion
   - Integration with CatalogPage

### Phase 2.4: Extended Filters (P2)

7. **Backend Extended Filters**
   - Prisma migration for new fields
   - Update game.service.ts filters
   - Add validation

8. **Frontend Extended Filters UI**
   - Rating filter component
   - Date range picker
   - Language multi-select

### Phase 2.5: Search History (P3)

9. **Search History Hook**
   - Create `useSearchHistory.ts`
   - localStorage management
   - Max 10 entries logic

10. **Search History UI**
    - History dropdown component
    - Clear history functionality
    - Integration with search input

### Phase 2.6: Integration & Polish

11. **CatalogPage Integration**
    - Integrate all new components
    - Update filter state management
    - URL parameter synchronization

12. **Testing & Optimization**
    - Performance testing
    - Accessibility audit
    - Mobile responsiveness check
    - Bundle size verification

## Next Steps

После завершения планирования:

1. **Generate Tasks**: Run `/speckit.tasks` to create detailed task breakdown
2. **Review Plan**: Ensure all requirements from spec are covered
3. **Begin Implementation**: Run `/speckit.implement` to execute tasks
