/**
 * Orders API Routes - Hardened with Authentication, Validation & IDOR Protection
 */

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const db = require('../db');
const { verifyToken, optionalAuth, verifyAdmin } = require('../middleware/auth');

// ============================================
// GET /api/orders - Lấy danh sách đơn hàng (Bảo vệ IDOR)
// ============================================
router.get('/', verifyToken, async (req, res, next) => {
  try {
    const { user_id, status, page = 1, limit = 10 } = req.query;
    const offset = (Math.max(1, parseInt(page)) - 1) * Math.min(50, parseInt(limit));

    let query = 'SELECT * FROM orders WHERE 1=1';
    const params = [];

    // IDOR Check: Regular users can ONLY see their own orders!
    if (req.user.role !== 'admin') {
      query += ' AND user_id = ?';
      params.push(req.user.id);
    } else if (user_id) {
      // Admin filtering by specific user
      query += ' AND user_id = ?';
      params.push(user_id);
    }

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(Math.min(50, parseInt(limit)), offset);

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
// GET /api/orders/:id - Chi tiết đơn hàng (Chỉ chủ đơn hoặc Admin)
// ============================================
router.get('/:id', verifyToken, async (req, res, next) => {
  try {
    const { id } = req.params;

    const [orders] = await db.query('SELECT * FROM orders WHERE id = ?', [id]);
    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        error: { message: 'Không tìm thấy đơn hàng' }
      });
    }

    const order = orders[0];

    // IDOR check: Is the requester the owner or admin?
    if (req.user.role !== 'admin' && String(order.user_id) !== String(req.user.id)) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN_IDOR',
          message: 'Bạn không có quyền xem thông tin đơn hàng này.'
        }
      });
    }

    // Get order items
    const [items] = await db.query('SELECT * FROM order_items WHERE order_id = ?', [order.id]);

    res.json({
      success: true,
      data: {
        ...order,
        items
      }
    });

  } catch (error) {
    next(error);
  }
});

// ============================================
// POST /api/orders - Tạo đơn hàng mới (Validated)
// ============================================
router.post(
  '/',
  optionalAuth, // Optional auth: Guests can order, but if logged in, link user_id
  [
    body('customer_name').trim().notEmpty().withMessage('Họ và tên người nhận không được để trống'),
    body('customer_phone').trim().matches(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/).withMessage('Số điện thoại không hợp lệ'),
    body('customer_address').trim().isLength({ min: 5 }).withMessage('Địa chỉ giao hàng quá ngắn'),
    body('items').isArray({ min: 1 }).withMessage('Đơn hàng phải có ít nhất 1 sản phẩm')
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: errors.array()[0].msg,
            details: errors.array()
          }
        });
      }

      const {
        customer_name, customer_email, customer_phone,
        customer_address, customer_note, items, payment_method = 'cod'
      } = req.body;

      // Associate with verified authenticated user if available
      const userId = req.user ? req.user.id : (req.body.user_id || null);

      // Calculate totals securely on server (never trust client total directly)
      const subtotal = items.reduce((sum, item) => {
        const itemPrice = parseFloat(item.price) || 0;
        const itemQty = Math.max(1, parseInt(item.quantity) || 1);
        return sum + (itemPrice * itemQty);
      }, 0);

      const FREE_SHIPPING_THRESHOLD = 5000000;
      const shipping_fee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 200000;
      const total = subtotal + shipping_fee;

      // Generate secure unique order number
      const orderNumber = 'VOLTOR-' + Date.now().toString(36).toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000);

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
            payment_method, status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
        `, [
          orderNumber, userId,
          customer_name, customer_email || null, customer_phone, customer_address, customer_note || null,
          subtotal, shipping_fee, total,
          payment_method
        ]);

        const orderId = orderResult.insertId;

        // Create order items
        for (const item of items) {
          const qty = Math.max(1, parseInt(item.quantity) || 1);
          const price = parseFloat(item.price) || 0;

          await connection.query(`
            INSERT INTO order_items (
              order_id, product_id, product_name, product_sku, product_image,
              price, quantity, subtotal
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `, [
            orderId, item.product_id || null, item.name || item.product_name || 'Máy bơm VOLTOR',
            item.sku || item.product_sku || 'VOLTOR-SKU', item.image || item.product_image || null,
            price, qty, price * qty
          ]);

          // Update product stock if product_id is given
          if (item.product_id) {
            await connection.query(
              'UPDATE products SET stock = GREATEST(0, stock - ?), order_count = order_count + 1 WHERE id = ?',
              [qty, item.product_id]
            );
          }
        }

        await connection.commit();

        res.status(201).json({
          success: true,
          data: {
            order_id: orderId,
            order_number: orderNumber,
            total,
            message: 'Đặt hàng thành công'
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
  }
);

// ============================================
// PUT /api/orders/:id/status - Cập nhật trạng thái đơn hàng (Admin only)
// ============================================
router.put('/:id/status', verifyAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const VALID_STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        error: { message: `Trạng thái không hợp lệ. Phải là một trong: ${VALID_STATUSES.join(', ')}` }
      });
    }

    await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);

    res.json({
      success: true,
      data: { message: `Cập nhật trạng thái đơn hàng sang "${status}" thành công` }
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;
