#!/bin/bash

# Evans Peptides - Environment Check Script
echo "🔍 Checking Evans Peptides Environment Configuration..."
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local file not found"
    echo "   Create one by copying .env.example:"
    echo "   cp .env.example .env.local"
    echo ""
    exit 1
else
    echo "✅ .env.local file exists"
fi

# Function to check if a variable is set
check_var() {
    var_name=$1
    if grep -q "^${var_name}=" .env.local 2>/dev/null; then
        value=$(grep "^${var_name}=" .env.local | cut -d '=' -f 2)
        if [ -n "$value" ] && [ "$value" != "your_" ] && [ "$value" != "postgresql://" ]; then
            echo "✅ $var_name is set"
            return 0
        else
            echo "⚠️  $var_name is set but appears to be placeholder"
            return 1
        fi
    else
        echo "❌ $var_name is NOT set"
        return 1
    fi
}

echo ""
echo "📊 Checking required environment variables..."
echo ""

# Check all required variables
check_var "DATABASE_URL"
db_status=$?

check_var "JWT_SECRET"
jwt_status=$?

check_var "WOOCOMMERCE_URL"
woo_url=$?

check_var "WOOCOMMERCE_CONSUMER_KEY"
woo_key=$?

check_var "WOOCOMMERCE_CONSUMER_SECRET"
woo_secret=$?

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Summary
all_good=true
if [ $db_status -ne 0 ] || [ $jwt_status -ne 0 ]; then
    echo "⚠️  Database configuration incomplete"
    all_good=false
fi

if [ $woo_url -ne 0 ] || [ $woo_key -ne 0 ] || [ $woo_secret -ne 0 ]; then
    echo "⚠️  WooCommerce configuration incomplete"
    echo "   Products will not load without WooCommerce API credentials"
    all_good=false
fi

echo ""

if [ "$all_good" = true ]; then
    echo "✨ All environment variables are configured!"
    echo ""
    echo "Next steps:"
    echo "1. Run: npm run dev"
    echo "2. Open: http://localhost:3000"
    echo ""
else
    echo "❌ Configuration incomplete"
    echo ""
    echo "📝 To fix:"
    echo "1. Edit .env.local file"
    echo "2. Add your WooCommerce credentials"
    echo "3. Get credentials from: WooCommerce > Settings > Advanced > REST API"
    echo "4. See VERCEL_DEPLOYMENT.md for Vercel setup"
    echo ""
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
