# Vercel Deployment Guide

## Environment Variables Required

To make your products load correctly on Vercel, you MUST add these environment variables in your Vercel project settings:

### 1. Go to Vercel Dashboard
- Navigate to your project
- Click on **Settings** tab
- Click on **Environment Variables**

### 2. Add Required Variables

#### Database (Required)
```
DATABASE_URL=postgresql://your_connection_string
JWT_SECRET=your_long_random_secret_key
```

#### WooCommerce API (Required for products to load)
```
WOOCOMMERCE_URL=https://your-woocommerce-store.com
WOOCOMMERCE_CONSUMER_KEY=ck_your_consumer_key_here
WOOCOMMERCE_CONSUMER_SECRET=cs_your_consumer_secret_here
```

### 3. How to Get WooCommerce API Credentials

1. Log into your WooCommerce admin dashboard
2. Go to **WooCommerce** → **Settings** → **Advanced** → **REST API**
3. Click **Add key**
4. Fill in:
   - **Description**: Vercel Production Site
   - **User**: Select your admin user
   - **Permissions**: Read/Write
5. Click **Generate API key**
6. Copy the **Consumer key** and **Consumer secret**
7. Add them to Vercel environment variables

### 4. Important Notes

- ⚠️ **Environment variables are NOT deployed automatically** - you must add them manually in Vercel
- After adding environment variables, you must **redeploy** your project
- Make sure your WooCommerce store has products published
- Ensure your WooCommerce REST API is enabled

### 5. Troubleshooting

If products still don't load:

1. **Check Vercel Logs**:
   - Go to your Vercel deployment
   - Click on the deployment
   - View the **Function Logs**
   - Look for WooCommerce error messages

2. **Common Issues**:
   - Missing environment variables (check all 5 are set)
   - Wrong WooCommerce URL (should be your full domain with https://)
   - Invalid API credentials
   - WooCommerce REST API disabled
   - CORS issues (WooCommerce should allow your Vercel domain)

3. **Test WooCommerce API Manually**:
   ```bash
   curl -u ck_xxx:cs_xxx https://your-store.com/wp-json/wc/v3/products
   ```

4. **Check Browser Console**:
   - Open browser DevTools (F12)
   - Check Console for errors
   - Check Network tab for failed API calls

### 6. Redeploy After Setting Variables

After adding all environment variables:
1. Go to **Deployments** tab in Vercel
2. Click on the latest deployment
3. Click the **...** menu
4. Select **Redeploy**

---

## Quick Checklist

- [ ] Added `DATABASE_URL` to Vercel
- [ ] Added `JWT_SECRET` to Vercel  
- [ ] Added `WOOCOMMERCE_URL` to Vercel
- [ ] Added `WOOCOMMERCE_CONSUMER_KEY` to Vercel
- [ ] Added `WOOCOMMERCE_CONSUMER_SECRET` to Vercel
- [ ] Verified WooCommerce REST API is enabled
- [ ] Redeployed the project
- [ ] Checked Vercel logs for errors

---

## Support

If you continue to have issues, check:
- Vercel function logs for detailed error messages
- Browser console for client-side errors
- WooCommerce API health endpoint: `https://your-store.com/wp-json/wc/v3/system_status`
