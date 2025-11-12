# 🚀 Quick Fix: Products Not Loading on Vercel

## The Problem
Your products load locally but not on Vercel because **environment variables aren't automatically deployed**.

## The Solution (5 minutes)

### Step 1: Get Your WooCommerce API Credentials
1. Log into your WooCommerce admin
2. Go to: **WooCommerce** → **Settings** → **Advanced** → **REST API**
3. Click **"Add key"**
4. Set permissions to **"Read/Write"**
5. Click **"Generate API key"**
6. **Copy both keys** (you'll need them in Step 2)

### Step 2: Add Variables to Vercel
1. Go to [vercel.com](https://vercel.com) and open your project
2. Click **Settings** → **Environment Variables**
3. Add these 3 variables:

```
Name: WOOCOMMERCE_URL
Value: https://your-woocommerce-store.com

Name: WOOCOMMERCE_CONSUMER_KEY  
Value: ck_xxxxxxxxxxxxxxxxxxxxx (paste your key)

Name: WOOCOMMERCE_CONSUMER_SECRET
Value: cs_xxxxxxxxxxxxxxxxxxxxx (paste your secret)
```

### Step 3: Redeploy
1. Go to the **Deployments** tab
2. Click on your latest deployment
3. Click **...** menu → **"Redeploy"**
4. Wait 1-2 minutes for deployment to complete

### Step 4: Test
Visit your Vercel URL and check if products load!

---

## Still Not Working?

### Check Vercel Logs
1. Go to your deployment in Vercel
2. Click **View Function Logs**
3. Look for errors mentioning "WooCommerce"

### Common Issues

**Issue**: "WooCommerce not configured" error
- **Fix**: Make sure all 3 environment variables are added in Vercel (check spelling!)

**Issue**: "API error: 401 Unauthorized"  
- **Fix**: Your API credentials are wrong. Generate new ones in WooCommerce

**Issue**: "API error: 404 Not Found"
- **Fix**: Check your WOOCOMMERCE_URL is correct (include https://)

**Issue**: Products work locally but not on Vercel
- **Fix**: You forgot to add env vars to Vercel OR you didn't redeploy

### Test Your WooCommerce API
Run this command to test if your API works:
```bash
curl -u ck_your_key:cs_your_secret https://your-store.com/wp-json/wc/v3/products
```

If this returns products, your WooCommerce is configured correctly.

---

## Need Help?
- Check `VERCEL_DEPLOYMENT.md` for detailed instructions
- Run `./check-env.sh` locally to verify your local environment
- Check browser console (F12) for error messages
- Check Vercel function logs for server errors

---

## Environment Variables Checklist
- [ ] `WOOCOMMERCE_URL` added to Vercel
- [ ] `WOOCOMMERCE_CONSUMER_KEY` added to Vercel
- [ ] `WOOCOMMERCE_CONSUMER_SECRET` added to Vercel
- [ ] Redeployed after adding variables
- [ ] Products are published in WooCommerce
- [ ] WooCommerce REST API is enabled

**Remember**: Environment variables are PER ENVIRONMENT. Add them to Production, Preview, and Development if needed!
