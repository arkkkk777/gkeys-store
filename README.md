# GKEYS Store

Modern gaming store platform built with React, TypeScript, and Express.

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install
cd backend && npm install && cd ..

# Start frontend
npm run dev

# Start backend (in another terminal)
cd backend && npm run dev
```

### Production Build

```bash
# Build frontend
npm run build

# Build backend
cd backend && npm run build
```

## 📦 Project Structure

```
gkeys2/
├── src/              # Frontend (React + TypeScript)
├── backend/          # Backend (Express + TypeScript)
│   ├── src/
│   │   ├── routes/   # API routes
│   │   ├── services/ # Business logic
│   │   └── ...
│   └── prisma/       # Database schema
├── dist/             # Frontend build output
└── package.json
```

## 🌐 Deployment

### Vercel

This project is configured for Vercel deployment:

1. Push to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy!

### Environment Variables

Required environment variables for backend:

```env
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
PORT=3001
CORS_ORIGIN=https://your-domain.vercel.app
```

## 📚 Documentation

- `QUICK_START.md` - Quick start guide
- `SETUP.md` - Detailed setup instructions
- `README_LOCAL.md` - Local development guide

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Framer Motion
- **Backend**: Express, TypeScript, Prisma, PostgreSQL
- **Deployment**: Vercel

## 📄 License

Private project
