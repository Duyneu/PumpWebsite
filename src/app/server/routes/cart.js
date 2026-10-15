/**
 * Cart API Routes
 */

const express = require('express');
const router = express.Router();
const db = require('../db');

// ============================================
// GET /api/cart/:user_id - Lấy giỏ hàng
// ============================================
router.get('/:user_id', async (req, res, next) => {
  try {
    const { user_id } = req.params;

    const [items] = await db.query(`
      SELECT 
        c.*,
        p.name, p.slug, p.price, p.image, p.stock, p.sku
      FROM cart_items c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = ? AND p.is_active = 1
    `, [user_id]);

    res.json({
      success: true,
      data: { items }
    });

  } catch (error) {
    next(error);
  }
});

// ============================================
// POST /api/cart - Thêm vào giỏ hàng
// ============================================
router.post('/', async (req, res, next) => {
  try {
    const { user_id, product_id, quantity = 1 } = req.body;

    // Check if item exists
    const [existing] = await db.query(
      'SELECT id, quantity FROM cart_items WHERE user_id = ? AND product_id = ?',
      [user_id, product_id]
    );

    if (existing.length > 0) {
      // Update quantity
      await db.query(
        'UPDATE cart_items SET quantity = quantity + ? WHERE id = ?',
        [quantity, existing[0].id]
      );
    } else {
      // Insert new
      await db.query(
        'INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)',
        [user_id, product_id, quantity]
      );
    }

    res.json({
      success: true,
      data: { message: 'Item added to cart' }
    });

  } catch (error) {
    next(error);
  }
});

// ============================================
// PUT /api/cart/:id - Cập nhật số lượng
// ============================================
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    await db.query('UPDATE cart_items SET quantity = ? WHERE id = ?', [quantity, id]);

    res.json({
      success: true,
      data: { message: 'Cart updated' }
    });

  } catch (error) {
    next(error);
  }
});

// ============================================
// DELETE /api/cart/:id - Xóa khỏi giỏ hàng
// ============================================
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    await db.query('DELETE FROM cart_items WHERE id = ?', [id]);

    res.json({
      success: true,
      data: { message: 'Item removed from cart' }
    });

  } catch (error) {
    next(error);
  }
});

// ============================================
// DELETE /api/cart/user/:user_id - Xóa tất cả
// ============================================
router.delete('/user/:user_id', async (req, res, next) => {
  try {
    const { user_id } = req.params;

    await db.query('DELETE FROM cart_items WHERE user_id = ?', [user_id]);

    res.json({
      success: true,
      data: { message: 'Cart cleared' }
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;
