# 🚀 Quick Start: Connect WooCommerce

## What You Need

From your WordPress admin panel, get these 3 things:

1. **Your WordPress Site URL**
   - Example: `https://evanspeptides.com`
   - Or: `https://shop.yoursite.com`

2. **Consumer Key** (starts with `ck_`)
   - From: WooCommerce > Settings > Advanced > REST API
   
3. **Consumer Secret** (starts with `cs_`)
   - From: Same place as Consumer Key

## How to Get API Keys (2 minutes)

1. Go to: **WordPress Admin** → **WooCommerce** → **Settings**
2. Click: **Advanced** tab → **REST API**
3. Click: **Add Key** button
4. Set:
   - Description: `Next.js Site`
   - User: Your admin account
   - Permissions: **Read** (or Read/Write)
5. Click: **Generate API Key**
6. **COPY BOTH KEYS NOW** (you can't see them again!)

## Add to .env.local

Edit: `/workspaces/EvansSarmLab/.env.local`

Replace these lines with YOUR actual values:

```bash
WOOCOMMERCE_URL=https://yoursite.com
WOOCOMMERCE_CONSUMER_KEY=ck_your_actual_key_here
WOOCOMMERCE_CONSUMER_SECRET=cs_your_actual_secret_here
```

## Restart Server

```bash
# Press Ctrl+C to stop the server
# Then restart:
npm run dev
```

## Test It

1. Open: http://localhost:3000/order
2. Your products should appear automatically! 🎉

## Your Products Will Show:
- ✅ Product images
- ✅ Product names
- ✅ Prices
- ✅ Descriptions
- ✅ Stock status

---

**Need detailed help?** See `WOOCOMMERCE_SETUP.md` for full guide.
