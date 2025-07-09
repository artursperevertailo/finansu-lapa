#!/bin/bash

echo "🚀 Setting up Finanšu Ceļvedis project..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Install main app dependencies
echo "📦 Installing main app dependencies..."
npm install

# Set up environment variables
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "⚠️  Please edit .env file with your actual configuration values"
else
    echo "✅ .env file already exists"
fi

# Install and set up Sanity Studio
echo "🎨 Setting up Sanity Studio..."
cd studio

if [ ! -f .env ]; then
    echo "📝 Creating studio .env file..."
    cp ../env.example .env
    echo "⚠️  Please edit studio/.env file with your Sanity configuration"
else
    echo "✅ Studio .env file already exists"
fi

npm install

cd ..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your configuration"
echo "2. Start the main app: npm run dev"
echo "3. Start Sanity Studio: cd studio && npm run dev"
echo ""
echo "📚 For more information, see README.md" 