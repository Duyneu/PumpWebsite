/**
 * Users API Routes
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

// ============================================
// GET /api/users - Lấy danh sách users (Admin)
// ============================================
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const [users] = await db.query(`
      SELECT 
        id, email, name, phone, address, avatar, 
        provider, role, is_active, created_at, last_login
      FROM users
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `, [parseInt(limit), parseInt(offset)]);

    const [countResult] = await db.query('SELECT COUNT(*) as total FROM users');
    const total = countResult[0].total;

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    next(error);
  }
});

// ============================================
// GET /api/users/:id - Lấy thông tin user
// ============================================
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const [users] = await db.query(`
      SELECT 
        id, email, name, phone, address, avatar, 
        provider, role, is_active, created_at, last_login
      FROM users
      WHERE id = ?
    `, [id]);

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        error: { message: 'User not found' }
      });
    }

    res.json({
      success: true,
      data: users[0]
    });

  } catch (error) {
    next(error);
  }
});

// ============================================
// POST /api/users - Tạo user mới
// ============================================
router.post('/', async (req, res, next) => {
  try {
    const {
      email, password, name, phone, address, avatar,
      provider = 'local', provider_id, role = 'user'
    } = req.body;

    // Check email exists
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        error: { message: 'Email already exists' }
      });
    }

    // Hash password (nếu có)
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const [result] = await db.query(`
      INSERT INTO users (
        email, password, name, phone, address, avatar,
        provider, provider_id, role
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      email, hashedPassword, name, phone, address, avatar,
      provider, provider_id, role
    ]);

    res.status(201).json({
      success: true,
      data: {
        id: result.insertId,
        email,
        name,
        message: 'User created successfully'
      }
    });

  } catch (error) {
    next(error);
  }
});

// ============================================
// PUT /api/users/:id - Cập nhật thông tin user
// ============================================
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, phone, address, avatar } = req.body;

    await db.query(`
      UPDATE users 
      SET name = ?, phone = ?, address = ?, avatar = ?
      WHERE id = ?
    `, [name, phone, address, avatar, id]);

    res.json({
      success: true,
      data: { message: 'User updated successfully' }
    });

  } catch (error) {
    next(error);
  }
});

// ============================================
// PUT /api/users/:id/password - Đổi mật khẩu
// ============================================
router.put('/:id/password', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { current_password, new_password } = req.body;

    // Get current password
    const [users] = await db.query('SELECT password FROM users WHERE id = ?', [id]);
    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        error: { message: 'User not found' }
      });
    }

    // Verify current password
    const isValid = await bcrypt.compare(current_password, users[0].password);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        error: { message: 'Current password is incorrect' }
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(new_password, 10);

    // Update password
    await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, id]);

    res.json({
      success: true,
      data: { message: 'Password updated successfully' }
    });

  } catch (error) {
    next(error);
  }
});

// ============================================
// DELETE /api/users/:id - Xóa user (Admin)
// ============================================
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    // Soft delete
    await db.query('UPDATE users SET is_active = 0 WHERE id = ?', [id]);

    res.json({
      success: true,
      data: { message: 'User deleted successfully' }
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;
