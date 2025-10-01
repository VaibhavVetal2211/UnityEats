#!/bin/bash

# UnityEats Frontend Deployment Script for Render
echo "🚀 UnityEats Frontend Deployment to Render"
echo "=========================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if dist folder exists
if [ ! -d "dist" ]; then
    echo "📦 Building the project..."
    npm run build
    
    if [ $? -ne 0 ]; then
        echo "❌ Build failed. Please fix the errors and try again."
        exit 1
    fi
    echo "✅ Build completed successfully!"
else
    echo "✅ Build folder already exists."
fi

# Check if render.yaml exists
if [ ! -f "render.yaml" ]; then
    echo "❌ Error: render.yaml not found. Please ensure the file exists."
    exit 1
fi

echo ""
echo "📋 Next Steps:"
echo "1. Go to https://dashboard.render.com"
echo "2. Click 'New +' → 'Blueprint'"
echo "3. Connect your GitHub repository"
echo "4. Render will detect the render.yaml file"
echo "5. Update the VITE_API_URL environment variable with your backend URL"
echo "6. Deploy!"
echo ""
echo "🔗 Your backend URL should look like: https://unityeats-backend-xxxxx.onrender.com"
echo "📝 Set VITE_API_URL to: https://your-backend-url.onrender.com/api"
echo ""
echo "✅ Ready for deployment!"
