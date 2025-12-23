#!/bin/bash
# Prepare project for deployment to Vercel

set -e

echo "🚀 Preparing project for deployment..."

# 1. Check git status
echo "📋 Checking git status..."
git status

# 2. Verify all important files exist
echo "✅ Verifying files..."
files_to_check=(
  "vercel.json"
  "package.json"
  "backend/package.json"
  ".github/workflows/ci.yml"
)

for file in "${files_to_check[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✓ $file"
  else
    echo "  ✗ Missing: $file"
  fi
done

# 3. Check environment variables documentation
echo "📝 Environment variables needed for Vercel:"
echo ""
echo "Frontend:"
echo "  VITE_API_BASE_URL=https://your-backend-url.com/api"
echo ""
echo "Backend (if deploying separately):"
echo "  DATABASE_URL=postgresql://..."
echo "  JWT_SECRET=..."
echo "  G2A_API_KEY=..."
echo "  G2A_API_HASH=..."
echo "  G2A_ENV=sandbox"
echo ""

# 4. Build check
echo "🔨 Testing builds..."
echo "Frontend build test..."
npm run build

echo "Backend build test..."
cd backend
npm run build
cd ..

echo ""
echo "✅ Project is ready for deployment!"
echo ""
echo "Next steps:"
echo "1. git add ."
echo "2. git commit -m 'Prepare for Vercel deployment'"
echo "3. git push"
echo "4. Deploy to Vercel (via dashboard or CLI)"
echo ""
echo "See DEPLOYMENT_INFO.md for detailed instructions"
