# WooCommerce Integration Setup Guide

## Step 1: Generate WooCommerce API Keys

### In Your WordPress Admin:

1. **Log in to WordPress Admin**
   - Go to your WordPress site: `https://your-site.com/wp-admin`

2. **Navigate to WooCommerce Settings**
   - Click `WooCommerce` in the left sidebar
   - Click `Settings`
   - Click the `Advanced` tab
   - Click the `REST API` sub-tab

3. **Create New API Key**
   - Click `Add Key` button
   - Fill in the details:
     - **Description**: `Next.js Website`
     - **User**: Select your admin user
     - **Permissions**: Select `Read/Write` or `Read` (Read is enough if you're only displaying products)
   - Click `Generate API Key`

4. **Copy Your Credentials**
   - You'll see two keys:
     - **Consumer Key**: Starts with `ck_`
     - **Consumer Secret**: Starts with `cs_`
   - ⚠️ **IMPORTANT**: Copy these NOW - you can't view them again!

## Step 2: Update .env.local File

Open `/workspaces/EvansSarmLab/.env.local` and replace these values:

```bash
# Your WordPress/WooCommerce site URL (no trailing slash)
WOOCOMMERCE_URL=https://yoursite.com

# Consumer Key (starts with ck_)
WOOCOMMERCE_CONSUMER_KEY=ck_1234567890abcdef1234567890abcdef12345678

# Consumer Secret (starts with cs_)
WOOCOMMERCE_CONSUMER_SECRET=cs_1234567890abcdef1234567890abcdef12345678
```

### Example with Real Values:
```bash
WOOCOMMERCE_URL=https://evanspeptides.com
WOOCOMMERCE_CONSUMER_KEY=ck_9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e
WOOCOMMERCE_CONSUMER_SECRET=cs_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t
```

## Step 3: Restart Your Development Server

After updating `.env.local`:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 4: Test the Integration

1. Open http://localhost:3000/order
2. You should see your WooCommerce products!

## What Data Gets Pulled

The integration automatically fetches:

✅ **Product Name** - from WooCommerce product title  
✅ **Product Price** - regular price (or sale price if active)  
✅ **Product Images** - main product image  
✅ **Product Description** - short and full descriptions  
✅ **Product ID** - WooCommerce product ID  
✅ **Product SKU** - if set  
✅ **Stock Status** - in stock, out of stock  
✅ **Categories** - product categories  

## Troubleshooting

### Error: "ENOTFOUND undefined"
- Missing WooCommerce URL in .env.local
- Check that `WOOCOMMERCE_URL` is set

### Error: "401 Unauthorized"
- Invalid API keys
- Check Consumer Key and Consumer Secret
- Verify API permissions in WordPress

### Error: "SSL Certificate Problem"
- Your WordPress site needs a valid SSL certificate
- Try adding `?insecure=true` to WOOCOMMERCE_URL temporarily (not recommended for production)

### No Products Showing
- Check that you have published products in WooCommerce
- Verify products are not set to "Draft" status
- Check browser console for error messages

### Images Not Loading
- Check that product images are set in WooCommerce
- Verify image URLs are accessible
- Check CORS settings if images are on different domain

## Security Notes

⚠️ **NEVER commit .env.local to Git!**
- It's already in `.gitignore`
- These keys give access to your store
- Keep them private

✅ **Use Read-Only Permissions**
- If you're only displaying products, use "Read" permission
- This limits potential damage if keys are compromised

## Testing Your API Keys

You can test if your keys work by visiting this URL in your browser (replace with your values):

```
https://yoursite.com/wp-json/wc/v3/products?consumer_key=ck_your_key&consumer_secret=cs_your_secret
```

You should see JSON data with your products.

## Need Help?

Common issues:
1. **Can't find REST API settings**: Update WooCommerce to latest version
2. **API keys not working**: Try regenerating them
3. **Products not showing**: Check WooCommerce product status (must be "Published")

---

Once configured, your products will automatically sync and display with:
- Product images
- Names and descriptions  
- Prices
- Stock status
- Add to cart functionality
