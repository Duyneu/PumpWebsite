/**
 * Orders API Routes
 */

const express = require('express');
const router = express.Router();
const db = require('../db');

// ============================================
// GET /api/orders - Lấy danh sách orders
// ============================================
router.get('/', async (req, res, next) => {
  try {
    const { user_id, status, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM orders WHERE 1=1';
    const params = [];

    if (user_id) {
      query += ' AND user_id = ?';
      params.push(user_id);
    }

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [orders] = await db.query(query, params);

    res.json({
      success: true,
      data: { orders }
    });

  } catch (error) {
    next(error);
  }
});

// ============================================
// POST /api/orders - Tạo order mới
// ============================================
router.post('/', async (req, res, next) => {
  try {
    const {
      user_id, customer_name, customer_email, customer_phone,
      customer_address, customer_note, items, payment_method
    } = req.body;

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping_fee = 0; // Calculate based on address
    const total = subtotal + shipping_fee;

    // Generate order number
    const orderNumber = 'ORD' + Date.now();

    // Start transaction
    const connection = await db.promisePool.getConnection();
    await connection.beginTransaction();

    try {
      // Create order
      const [orderResult] = await connection.query(`
        INSERT INTO orders (
          order_number, user_id,
          customer_name, customer_email, customer_phone, customer_address, customer_note,
          subtotal, shipping_fee, total,
          payment_method
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        orderNumber, user_id,
        customer_name, customer_email, customer_phone, customer_address, customer_note,
        subtotal, shipping_fee, total,
        payment_method
      ]);

      const orderId = orderResult.insertId;

      // Create order items
      for (const item of items) {
        await connection.query(`
          INSERT INTO order_items (
            order_id, product_id, product_name, product_sku, product_image,
            price, quantity, subtotal
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          orderId, item.product_id, item.product_name, item.product_sku, item.product_image,
          item.price, item.quantity, item.price * item.quantity
        ]);

        // Update product stock
        await connection.query(
          'UPDATE products SET stock = stock - ?, order_count = order_count + 1 WHERE id = ?',
          [item.quantity, item.product_id]
        );
      }

      await connection.commit();

      res.status(201).json({
        success: true,
        data: {
          order_id: orderId,
          order_number: orderNumber,
          message: 'Order created successfully'
        }
      });

    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }

  } catch (error) {
    next(error);
  }
});

module.exports = router;
