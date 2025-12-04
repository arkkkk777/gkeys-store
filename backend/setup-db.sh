#!/bin/bash
set -e

echo "🚀 Setting up GKEYS Store database..."

# Check if PostgreSQL is running
if ! pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
    echo "❌ PostgreSQL is not running on localhost:5432"
    echo ""
    echo "Please start PostgreSQL first:"
    echo ""
    echo "Option 1 - Docker:"
    echo "  docker run --name gkeys-postgres \\"
    echo "    -e POSTGRES_PASSWORD=postgres \\"
    echo "    -e POSTGRES_DB=gkeys_store \\"
    echo "    -p 5432:5432 \\"
    echo "    -d postgres:15"
    echo ""
    echo "Option 2 - Homebrew (macOS):"
    echo "  brew services start postgresql@15"
    echo "  createdb gkeys_store"
    echo ""
    exit 1
fi

echo "✅ PostgreSQL is running"

# Generate Prisma client
echo "📦 Generating Prisma client..."
npm run prisma:generate

# Run migrations
echo "🗄️  Running database migrations..."
npm run prisma:migrate -- --name init || {
    echo "⚠️  Migration might have already been applied"
}

# Seed database
echo "🌱 Seeding database with test data..."
npm run prisma:seed

echo ""
echo "✅ Database setup complete!"
echo ""
echo "Test accounts:"
echo "  Admin: admin@gkeys.store / admin123"
echo "  User:  test@example.com / password123"
echo ""
