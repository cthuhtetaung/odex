#!/bin/bash

# OdeX ERP Website Deployment Script
echo "🚀 Starting OdeX ERP Website Deployment..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git branch -M main
fi

# Add all files
echo "📁 Adding files to Git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Deploy OdeX ERP Website - $(date)"

# Check if remote exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "⚠️  No remote repository found."
    echo "Please add your GitHub repository:"
    echo "git remote add origin https://github.com/your-username/odoo-erp-website.git"
    echo ""
    echo "Then run: git push -u origin main"
    exit 1
fi

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
git push origin main

echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Go to your GitHub repository"
echo "2. Navigate to Settings → Pages"
echo "3. Select 'Deploy from a branch'"
echo "4. Choose 'main' branch and '/' folder"
echo "5. Save and wait for deployment"
echo ""
echo "Your site will be available at: https://your-username.github.io/odoo-erp-website"
echo ""
echo "For Vercel deployment, run: vercel"
