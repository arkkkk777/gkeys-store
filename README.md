# GKEYS Store - Modern Gaming Keys Platform

A modern, full-featured platform for selling game keys with an optimized interface, advanced visual effects, and high performance.

## 🚀 Technology Stack

### Frontend
- **React 19** - Latest React with improved performance
- **TypeScript 5.9** - Full type safety for code reliability
- **Vite 7** - Lightning-fast build and HMR
- **React Router 7** - Modern routing
- **Tailwind CSS 3** - Utility-first CSS framework
- **Framer Motion 12** - Advanced animations
- **GSAP 3** - Professional animation for complex effects
- **shadcn/ui** - 40+ ready-to-use UI components

### Backend
- **Express.js** - RESTful API server
- **Prisma** - ORM for database operations
- **PostgreSQL** - Relational database
- **TypeScript** - Typed backend

## ✨ Key Features

### 🎨 Enhanced Hero Section
- **Fullscreen cover** - Hero section takes full screen (100vh)
- **Interactive carousel** - Horizontal carousel with game thumbnails over overlay
- **Gradient overlay** - Smooth top darkening for better readability
- **Large heading** - 72px game title for maximum visual impact
- **Aurora effect** - Dynamic background glow with adjustable intensity
- **Compact buttons** - Optimized button sizes for better UX

### 🎭 Visual Effects
- **Aurora Component** - Smooth gradient glow effects
- **ClickSpark** - Spark effect on button clicks
- **Animated Sections** - Fullscreen animated sections with GSAP
- **Smooth Transitions** - Smooth state transitions

### ⚡ Performance Optimization
- **Code Splitting** - Automatic code splitting into chunks:
  - `react-vendor` - React, React DOM, React Router
  - `ui-vendor` - Framer Motion, Radix UI components
  - `animation-vendor` - GSAP and related libraries
- **Tree Shaking** - Unused code removal
- **Minification** - Terser minification with console/debugger removal
- **Image Optimization** - Image optimization
- **Lazy Loading** - Component lazy loading

### 📦 Build Sizes (Optimized)
```
dist/index.html                             0.62 kB │ gzip:   0.34 kB
dist/assets/index-D5DggC8A.css             49.75 kB │ gzip:   9.63 kB
dist/assets/animation-vendor-D9tCNwfU.js    0.04 kB │ gzip:   0.06 kB
dist/assets/react-vendor-C8WmLSiQ.js       45.14 kB │ gzip:  15.90 kB
dist/assets/ui-vendor-DPxLtVRV.js         116.10 kB │ gzip:  37.28 kB
dist/assets/index-BpxgjCIV.js             575.13 kB │ gzip: 136.39 kB
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 20.0.0 ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **PostgreSQL** 15+ ([Download](https://www.postgresql.org/download/)) or **Docker** ([Download](https://www.docker.com/))

## 🛠️ Installation

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd gkeys2
```

### Step 2: Install Frontend Dependencies

```bash
npm install
```

### Step 3: Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

## ⚙️ Configuration

### Step 1: Set Up PostgreSQL Database

#### Option A: Using Docker (Recommended)

```bash
# Run PostgreSQL container
docker run --name gkeys-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=gkeys_store \
  -p 5432:5432 \
  -d postgres:15

# If container already exists, just start it
docker start gkeys-postgres
```

#### Option B: Local PostgreSQL Installation

1. Install PostgreSQL 15+ on your system
2. Create a database:

```bash
createdb gkeys_store
# Or via psql:
# psql -U postgres
# CREATE DATABASE gkeys_store;
```

### Step 2: Configure Environment Variables

#### Frontend Configuration

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:3001
```

#### Backend Configuration

Create a `backend/.env` file:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/gkeys_store?schema=public"

# Server
PORT=3001
CORS_ORIGIN=http://localhost:5173

# JWT Authentication
JWT_SECRET="your-secret-key-change-in-production"

# Optional: Redis (for caching and queues)
REDIS_URL="redis://localhost:6379"

# Optional: Email (for notifications)
SMTP_HOST="smtp.example.com"
SMTP_PORT=587
SMTP_USER="your-email@example.com"
SMTP_PASS="your-password"
```

**Important:** Change `JWT_SECRET` to a secure random string in production!

### Step 3: Set Up Database Schema

```bash
cd backend

# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# (Optional) Seed database with test data
npm run prisma:seed
```

## 🚀 Running the Application

### Development Mode

You need to run both frontend and backend servers simultaneously.

#### Terminal 1 - Frontend

```bash
# From project root
npm run dev
```

Frontend will be available at: **http://localhost:5173**

#### Terminal 2 - Backend

```bash
# From project root
cd backend
npm run dev
```

Backend API will be available at: **http://localhost:3001**

### Production Build

#### Build Frontend

```bash
npm run build
```

The production build will be in the `dist/` directory.

#### Build Backend

```bash
cd backend
npm run build
```

The compiled backend will be in `backend/dist/`.

#### Preview Production Build

```bash
npm run preview
```

## 🧪 Testing the Installation

### Frontend

1. Open your browser and navigate to: **http://localhost:5173**
2. You should see the homepage with games

### Backend API

Test the backend health endpoint:

```bash
curl http://localhost:3001/health
```

Expected response:
```json
{"status":"ok","timestamp":"2024-12-05T..."}
```

Test games endpoint:

```bash
curl http://localhost:3001/api/games
```

### Test Accounts (After Seeding)

If you ran `npm run prisma:seed`, you can use these test accounts:

**Administrator:**
- Email: `admin@gkeys.store`
- Password: `admin123`

**Regular User:**
- Email: `test@example.com`
- Password: `password123`
- Balance: 100.00 EUR

## 📁 Project Structure

```
gkeys2/
├── src/                          # Frontend source code
│   ├── components/              # React components
│   │   ├── ui/                  # 40+ shadcn/ui components
│   │   │   ├── aurora.tsx      # Aurora effect
│   │   │   ├── click-spark.tsx # Click spark effect
│   │   │   └── game-item-card.tsx # Game card component
│   │   └── home/               # Home page components
│   ├── pages/                   # Application pages
│   ├── services/                # API services
│   ├── hooks/                   # React hooks
│   ├── styles/                  # Styles and design tokens
│   └── types/                   # TypeScript types
├── backend/                     # Backend application
│   ├── src/
│   │   ├── routes/              # API routes
│   │   ├── services/            # Business logic
│   │   ├── controllers/         # Controllers
│   │   ├── middleware/          # Express middleware
│   │   └── types/               # TypeScript types
│   └── prisma/                  # Database schema and migrations
│       ├── schema.prisma        # Prisma schema
│       └── migrations/         # Database migrations
├── docs/                        # Documentation
├── public/                      # Static assets
└── package.json                 # Frontend dependencies
```

## 🎨 Design System

### Color Palette

- **Primary**: `#00FF66` - Bright green (accent color)
- **Primary Dark**: `#00CC52` - Dark green variant
- **Accent**: `#b4ff00` - Neon green (for effects)
- **Background**: `#0D0D0D` - Dark background
- **Surface**: `#1A1A1A` / `#2A2A2A` - Cards and surfaces
- **Text**: `#FFFFFF` / `#999999` / `#666666` - Text hierarchy
- **Error**: `#FF4444` - Error color
- **Warning**: `#FFAA00` - Warning color
- **Success**: `#00FF66` - Success color

### Design Tokens

All design values (colors, spacing, typography, borders, animations) are centralized in `src/styles/design-tokens.ts` for visual consistency.

## 📄 Main Pages

### 1. **Home Page** (`/`)
- Fullscreen hero section with game carousel
- Best Sellers section
- New in Catalog section
- Preorders section
- Genre sections
- Random games

### 2. **Catalog Page** (`/catalog`)
- Advanced filters (platform, genre, price)
- Sorting (Popular, Newest, Price, Discount)
- Responsive card grid
- Wishlist functionality
- Pagination

### 3. **Cart Page** (`/cart`)
- Cart management
- Promo codes
- Payment method selection
- Recommendations

### 4. **Wishlist Page** (`/wishlist`)
- Saved games
- Wishlist statistics
- List management

### 5. **Support Page** (`/support`)
- FAQ with categories
- Search functionality
- Contact information

### 6. **Profile Pages** (`/profile/*`)
- User orders
- Balance and top-up
- Profile settings

### 7. **Game Detail** (`/game/:id`)
- Detailed game information
- Similar games
- Breadcrumb navigation

## 🔧 Development

### Adding New Components

```bash
# Add shadcn/ui component
npx shadcn@latest add [component-name]
```

### Prisma Commands

```bash
cd backend

# Generate Prisma Client
npm run prisma:generate

# Create and apply migration
npm run prisma:migrate

# Seed database
npm run prisma:seed

# Open Prisma Studio (GUI for database)
npm run prisma:studio
```

### Code Quality

```bash
# Lint frontend
npm run lint

# Lint backend
cd backend
npm run lint

# Format backend code
cd backend
npm run format
```

## 🐛 Troubleshooting

### Database Connection Error

1. **Check PostgreSQL is running:**
   ```bash
   # Docker
   docker ps | grep postgres
   
   # Local
   pg_isready
   ```

2. **Verify DATABASE_URL in `backend/.env`**

3. **Test database connection:**
   ```bash
   psql -U postgres -d gkeys_store -c "SELECT 1;"
   ```

### Port Already in Use

Change the port in:
- **Frontend**: `vite.config.ts`
- **Backend**: `backend/.env` (PORT=3001)

### Migration Issues

If migrations fail:

```bash
cd backend

# Reset database (WARNING: deletes all data!)
npx prisma migrate reset

# Re-run migrations
npm run prisma:migrate

# Re-seed data
npm run prisma:seed
```

### Build Errors

1. **Clear node_modules and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Clear Prisma cache:**
   ```bash
   cd backend
   rm -rf node_modules/.prisma
   npm run prisma:generate
   ```

## 🌐 Deployment

### Vercel (Recommended for Frontend)

1. Connect your GitHub repository to Vercel
2. Configure environment variables:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app/api
   ```
3. Deploy automatically on push to main branch

### Other Platforms

The project is ready to deploy on any Node.js-supporting platform:
- **Netlify**
- **Railway**
- **Render**
- **Heroku**

See `VERCEL_DEPLOY.md` for detailed deployment instructions.

## 📚 Additional Documentation

- `QUICK_START.md` - Quick start guide
- `SETUP.md` - Detailed setup instructions
- `VERCEL_DEPLOY.md` - Vercel deployment guide
- `docs/` - Component documentation
- `backend/README.md` - Backend-specific documentation

## 🎯 Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: ~800KB (gzipped ~200KB)

## 🚀 Roadmap

- [ ] PWA support
- [ ] Offline mode
- [ ] Push notifications
- [ ] Extended analytics
- [ ] Multi-language support (i18n)

## 📄 License

Private project - All rights reserved

## 👥 Contributing

This is a private project. For contributions, please contact the project maintainers.

---

**Version**: 1.0.0  
**Last Updated**: December 2024  
**Status**: Production Ready ✅
