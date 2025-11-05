// Netlify Function to fetch WooCommerce products
// This acts as a proxy to avoid CORS issues and hide API credentials

const https = require('https');

const WOOCOMMERCE_URL = 'vitasynlabs.com';
const CONSUMER_KEY = 'ck_a4b4226fbbdff41fd6d7faba18a10b3ebc3004cb';
const CONSUMER_SECRET = 'cs_30cb119423d871d615d87ac96c23420dad3c8e1e';

// Helper function to make HTTPS requests
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error('Failed to parse JSON response'));
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    console.log('Fetching products from WooCommerce...');
    
    const url = `https://${WOOCOMMERCE_URL}/wp-json/wc/v3/products?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&per_page=50&status=publish`;
    
    const products = await makeRequest(url);
    
    console.log(`Successfully fetched ${products.length} products`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(products)
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to fetch products',
        message: error.message 
      })
    };
  }
};
