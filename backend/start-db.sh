#!/bin/bash
# Script to start PostgreSQL for GKEYS Store

echo "Checking PostgreSQL..."

# Try to start via Docker
if command -v docker &> /dev/null; then
    if docker ps -a | grep -q gkeys-postgres; then
        echo "Starting existing PostgreSQL container..."
        docker start gkeys-postgres
    else
        echo "Creating new PostgreSQL container..."
        docker run --name gkeys-postgres \
            -e POSTGRES_PASSWORD=postgres \
            -e POSTGRES_DB=gkeys_store \
            -p 5432:5432 \
            -d postgres:15
    fi
    echo "PostgreSQL should be running on localhost:5432"
    echo "Wait a few seconds for it to start, then run: npm run prisma:migrate"
    exit 0
fi

# Try to start via Homebrew
if command -v brew &> /dev/null; then
    if brew services list | grep -q postgresql; then
        echo "Starting PostgreSQL via Homebrew..."
        brew services start postgresql@15 || brew services start postgresql
        sleep 3
        echo "PostgreSQL should be running"
        exit 0
    fi
fi

echo "❌ Could not start PostgreSQL automatically"
echo "Please start PostgreSQL manually or use Docker:"
echo "  docker run --name gkeys-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=gkeys_store -p 5432:5432 -d postgres:15"
