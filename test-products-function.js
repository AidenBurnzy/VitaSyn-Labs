// Quick test of the products function logic
const https = require('https');

const WOOCOMMERCE_URL = 'vitasynlabs.com';
const CONSUMER_KEY = 'ck_a4b4226fbbdff41fd6d7faba18a10b3ebc3004cb';
const CONSUMER_SECRET = 'cs_30cb119423d871d615d87ac96c23420dad3c8e1e';

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

async function testProducts() {
  try {
    console.log('Testing products fetch...');
    const url = `https://${WOOCOMMERCE_URL}/wp-json/wc/v3/products?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}&per_page=5&status=publish`;
    
    const products = await makeRequest(url);
    
    console.log(`✓ Successfully fetched ${products.length} products`);
    console.log('\nFirst product:');
    console.log(JSON.stringify(products[0], null, 2));
  } catch (error) {
    console.error('✗ Error:', error.message);
  }
}

testProducts();
