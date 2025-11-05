// Netlify Function: netlify/functions/orders.js
// Handles order creation and tracking

const { Pool } = require('pg');
const jwt = require('jsonwebtoken');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (authHeader) => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Authorization token required');
  }
  const token = authHeader.split(' ')[1];
  return jwt.verify(token, JWT_SECRET);
};

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const decoded = verifyToken(event.headers.authorization);
    const userId = decoded.userId;

    // GET orders
    if (event.httpMethod === 'GET') {
      const params = event.queryStringParameters || {};
      const { action, orderId } = params;

      // Get single order
      if (action === 'get' && orderId) {
        const orderResult = await pool.query(
          `SELECT o.*, 
            json_agg(
              json_build_object(
                'id', oi.id,
                'productId', oi.product_id,
                'productName', oi.product_name,
                'productPrice', oi.product_price,
                'quantity', oi.quantity,
                'subtotal', oi.subtotal
              )
            ) as items
           FROM orders o
           LEFT JOIN order_items oi ON o.id = oi.order_id
           WHERE o.id = $1 AND o.user_id = $2
           GROUP BY o.id`,
          [orderId, userId]
        );

        if (orderResult.rows.length === 0) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Order not found' })
          };
        }

        // Get status history
        const historyResult = await pool.query(
          `SELECT * FROM order_status_history
           WHERE order_id = $1
           ORDER BY created_at DESC`,
          [orderId]
        );

        const order = orderResult.rows[0];
        order.statusHistory = historyResult.rows;

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ order })
        };
      }

      // Get all orders
      const result = await pool.query(
        `SELECT o.*, 
          json_agg(
            json_build_object(
              'id', oi.id,
              'productId', oi.product_id,
              'productName', oi.product_name,
              'productPrice', oi.product_price,
              'quantity', oi.quantity,
              'subtotal', oi.subtotal
            )
          ) as items
         FROM orders o
         LEFT JOIN order_items oi ON o.id = oi.order_id
         WHERE o.user_id = $1
         GROUP BY o.id
         ORDER BY o.created_at DESC`,
        [userId]
      );

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ orders: result.rows })
      };
    }

    // CREATE order
    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body);
      const { action, shippingAddress, billingAddress, paymentMethod } = body;

      if (action !== 'create') {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid action' })
        };
      }

      const client = await pool.connect();

      try {
        await client.query('BEGIN');

        // Get cart items
        const cartResult = await client.query(
          `SELECT c.id as cart_id, ci.*
           FROM cart c
           LEFT JOIN cart_items ci ON c.id = ci.cart_id
           WHERE c.user_id = $1`,
          [userId]
        );

        const cartItems = cartResult.rows.filter(row => row.id !== null);

        if (cartItems.length === 0) {
          await client.query('ROLLBACK');
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Cart is empty' })
          };
        }

        // Calculate totals
        const subtotal = cartItems.reduce((sum, item) => 
          sum + (parseFloat(item.product_price) * item.quantity), 0
        );
        const shippingCost = subtotal >= 200 ? 0 : 15.00;
        const tax = 0; // Adjust as needed
        const total = subtotal + shippingCost + tax;

        // Generate order number
        const orderNumberResult = await client.query(
          'SELECT generate_order_number() as order_number'
        );
        const orderNumber = orderNumberResult.rows[0].order_number;

        // Create order
        const orderResult = await client.query(
          `INSERT INTO orders (
            user_id, order_number, subtotal, shipping_cost, tax, total, payment_method,
            shipping_first_name, shipping_last_name, shipping_company,
            shipping_address_line1, shipping_address_line2, shipping_city,
            shipping_state, shipping_postal_code, shipping_country,
            billing_first_name, billing_last_name, billing_company,
            billing_address_line1, billing_address_line2, billing_city,
            billing_state, billing_postal_code, billing_country
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7,
            $8, $9, $10, $11, $12, $13, $14, $15, $16,
            $17, $18, $19, $20, $21, $22, $23, $24, $25
          ) RETURNING *`,
          [
            userId, orderNumber, subtotal, shippingCost, tax, total, paymentMethod,
            shippingAddress.firstName, shippingAddress.lastName, shippingAddress.company,
            shippingAddress.addressLine1, shippingAddress.addressLine2, shippingAddress.city,
            shippingAddress.state, shippingAddress.postalCode, shippingAddress.country,
            billingAddress.firstName, billingAddress.lastName, billingAddress.company,
            billingAddress.addressLine1, billingAddress.addressLine2, billingAddress.city,
            billingAddress.state, billingAddress.postalCode, billingAddress.country
          ]
        );

        const order = orderResult.rows[0];

        // Add order items
        for (const item of cartItems) {
          await client.query(
            `INSERT INTO order_items (order_id, product_id, product_name, product_price, quantity, subtotal)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [
              order.id, 
              item.product_id, 
              item.product_name, 
              item.product_price, 
              item.quantity,
              parseFloat(item.product_price) * item.quantity
            ]
          );
        }

        // Add status history
        await client.query(
          `INSERT INTO order_status_history (order_id, status, notes, created_by)
           VALUES ($1, $2, $3, $4)`,
          [order.id, 'pending', 'Order created', decoded.email]
        );

        // Clear cart
        await client.query(
          'DELETE FROM cart_items WHERE cart_id = (SELECT id FROM cart WHERE user_id = $1)',
          [userId]
        );

        await client.query('COMMIT');

        return {
          statusCode: 201,
          headers,
          body: JSON.stringify({
            message: 'Order created successfully',
            order: {
              id: order.id,
              orderNumber: order.order_number,
              total: parseFloat(order.total),
              status: order.status,
              createdAt: order.created_at
            }
          })
        };

      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      } finally {
        client.release();
      }
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };

  } catch (error) {
    console.error('Orders error:', error);
    
    if (error.message === 'Authorization token required' || error.name === 'JsonWebTokenError') {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Unauthorized' })
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};