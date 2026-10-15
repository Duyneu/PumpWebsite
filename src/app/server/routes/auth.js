/**
 * Authentication API Routes
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'voltor-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

// ============================================
// POST /api/auth/register - Đăng ký
// ============================================
router.post('/register', async (req, res, next) => {
  try {
    const { email, password, name, phone } = req.body;

    // Validate
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        error: { message: 'Email, password and name are required' }
      });
    }

    // Check email exists
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        error: { message: 'Email already exists' }
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const [result] = await db.query(`
      INSERT INTO users (email, password, name, phone, provider)
      VALUES (?, ?, ?, ?, 'local')
    `, [email, hashedPassword, name, phone || null]);

    const userId = result.insertId;

    // Generate JWT
    const token = jwt.sign(
      { id: userId, email, role: 'user' },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({
      success: true,
      data: {
        user: { id: userId, email, name, phone, role: 'user' },
        token
      }
    });

  } catch (error) {
    next(error);
  }
});

// ============================================
// POST /api/auth/login - Đăng nhập
// ============================================
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: { message: 'Email and password are required' }
      });
    }

    // Get user
    const [users] = await db.query(`
      SELECT id, email, password, name, phone, address, avatar, role, provider
      FROM users
      WHERE email = ? AND is_active = 1
    `, [email]);

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        error: { message: 'Invalid email or password' }
      });
    }

    const user = users[0];

    // Check if OAuth user
    if (user.provider !== 'local') {
      return res.status(400).json({
        success: false,
        error: { message: `Please login with ${user.provider}` }
      });
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        error: { message: 'Invalid email or password' }
      });
    }

    // Update last login
    await db.query('UPDATE users SET last_login = NOW() WHERE id = ?', [user.id]);

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Remove password from response
    delete user.password;

    res.json({
      success: true,
      data: {
        user,
        token
      }
    });

  } catch (error) {
    next(error);
  }
});

// ============================================
// POST /api/auth/oauth - OAuth Login/Register
// ============================================
router.post('/oauth', async (req, res, next) => {
  try {
    const { email, name, avatar, provider, provider_id } = req.body;

    // Check if user exists
    const [existing] = await db.query(
      'SELECT * FROM users WHERE email = ? OR (provider = ? AND provider_id = ?)',
      [email, provider, provider_id]
    );

    let user;
    let token;

    if (existing.length > 0) {
      // Login existing user
      user = existing[0];

      // Update last login
      await db.query('UPDATE users SET last_login = NOW() WHERE id = ?', [user.id]);

    } else {
      // Register new user
      const [result] = await db.query(`
        INSERT INTO users (email, name, avatar, provider, provider_id)
        VALUES (?, ?, ?, ?, ?)
      `, [email, name || null, avatar || null, provider, provider_id]);

      const userId = result.insertId;

      // Get created user
      const [newUser] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
      user = newUser[0];
    }

    // Generate JWT
    token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Remove password from response
    delete user.password;

    res.json({
      success: true,
      data: {
        user,
        token,
        isNew: existing.length === 0
      }
    });

  } catch (error) {
    next(error);
  }
});

// ============================================
// GET /api/auth/me - Lấy thông tin user hiện tại
// ============================================
router.get('/me', async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        error: { message: 'No token provided' }
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Get user
    const [users] = await db.query(`
      SELECT id, email, name, phone, address, avatar, role, provider, created_at
      FROM users
      WHERE id = ? AND is_active = 1
    `, [decoded.id]);

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
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        error: { message: 'Invalid token' }
      });
    }
    next(error);
  }
});

module.exports = router;
