/**
 * Users API Routes - Hardened & Protected against IDOR and Privilege Escalation
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const db = require('../db');
const { verifyAdmin, requireSelfOrAdmin, verifyToken } = require('../middleware/auth');

// ============================================
// GET /api/users - Lấy danh sách users (Admin only)
// ============================================
router.get('/', verifyAdmin, async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (Math.max(1, parseInt(page)) - 1) * Math.min(100, parseInt(limit));

    const [users] = await db.query(`
      SELECT 
        id, email, name, phone, address, avatar, 
        provider, role, is_active, created_at, last_login
      FROM users
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `, [Math.min(100, parseInt(limit)), offset]);

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
// GET /api/users/:id - Lấy thông tin user (Chỉ chính user hoặc Admin) -> Chống IDOR
// ============================================
router.get('/:id', requireSelfOrAdmin(req => req.params.id), async (req, res, next) => {
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
        error: { message: 'Không tìm thấy người dùng' }
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
// POST /api/users - Tạo user mới (Admin hoặc đăng ký an toàn)
// ============================================
router.post(
  '/',
  [
    body('email').isEmail().withMessage('Email không hợp lệ').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Mật khẩu tối thiểu 6 ký tự'),
    body('name').trim().notEmpty().withMessage('Họ tên không được để trống')
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: { message: errors.array()[0].msg, details: errors.array() }
        });
      }

      const {
        email, password, name, phone, address, avatar,
        provider = 'local', provider_id
      } = req.body;

      // Prevent privilege escalation: Regular request cannot grant admin role
      const role = 'user';

      // Check email exists
      const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
      if (existing.length > 0) {
        return res.status(400).json({
          success: false,
          error: { message: 'Email đã tồn tại trong hệ thống' }
        });
      }

      // Hash password with bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      const [result] = await db.query(`
        INSERT INTO users (
          email, password, name, phone, address, avatar,
          provider, provider_id, role
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        email, hashedPassword, name, phone || null, address || null, avatar || null,
        provider, provider_id || null, role
      ]);

      res.status(201).json({
        success: true,
        data: {
          id: result.insertId,
          email,
          name,
          message: 'Tạo tài khoản thành công'
        }
      });

    } catch (error) {
      next(error);
    }
  }
);

// ============================================
// PUT /api/users/:id - Cập nhật thông tin user (Chỉ chính user hoặc Admin) -> Chống IDOR
// ============================================
router.put('/:id', requireSelfOrAdmin(req => req.params.id), async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, phone, address, avatar } = req.body;

    await db.query(`
      UPDATE users 
      SET name = COALESCE(?, name), 
          phone = COALESCE(?, phone), 
          address = COALESCE(?, address), 
          avatar = COALESCE(?, avatar)
      WHERE id = ?
    `, [name, phone, address, avatar, id]);

    res.json({
      success: true,
      data: { message: 'Cập nhật thông tin thành công' }
    });

  } catch (error) {
    next(error);
  }
});

// ============================================
// PUT /api/users/:id/password - Đổi mật khẩu (Chỉ chính user hoặc Admin)
// ============================================
router.put(
  '/:id/password',
  requireSelfOrAdmin(req => req.params.id),
  [
    body('current_password').notEmpty().withMessage('Vui lòng nhập mật khẩu hiện tại'),
    body('new_password').isLength({ min: 6 }).withMessage('Mật khẩu mới tối thiểu 6 ký tự')
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: { message: errors.array()[0].msg }
        });
      }

      const { id } = req.params;
      const { current_password, new_password } = req.body;

      // Get current password
      const [users] = await db.query('SELECT password FROM users WHERE id = ?', [id]);
      if (users.length === 0) {
        return res.status(404).json({
          success: false,
          error: { message: 'Không tìm thấy người dùng' }
        });
      }

      // Verify current password
      const isValid = await bcrypt.compare(current_password, users[0].password);
      if (!isValid) {
        return res.status(400).json({
          success: false,
          error: { message: 'Mật khẩu hiện tại không chính xác' }
        });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(new_password, 10);

      // Update password
      await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, id]);

      res.json({
        success: true,
        data: { message: 'Đổi mật khẩu thành công' }
      });

    } catch (error) {
      next(error);
    }
  }
);

// ============================================
// DELETE /api/users/:id - Xóa user (Admin only)
// ============================================
router.delete('/:id', verifyAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;

    // Prevent admin from deleting themselves
    if (String(req.user.id) === String(id)) {
      return res.status(400).json({
        success: false,
        error: { message: 'Không thể tự xóa tài khoản của chính mình' }
      });
    }

    // Soft delete
    await db.query('UPDATE users SET is_active = 0 WHERE id = ?', [id]);

    res.json({
      success: true,
      data: { message: 'Đã khóa tài khoản người dùng thành công' }
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;
