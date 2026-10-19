/**
 * Authentication & Authorization Middleware
 * Protects routes against unauthorized access and privilege escalation (Broken Access Control)
 */

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'voltor-secret-key-change-in-production-2026';

/**
 * Verifies that the request contains a valid, non-expired JWT Bearer token
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Yêu cầu đăng nhập để truy cập tài nguyên này'
      }
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: {
          code: 'TOKEN_EXPIRED',
          message: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.'
        }
      });
    }

    return res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_TOKEN',
        message: 'Token xác thực không hợp lệ.'
      }
    });
  }
};

/**
 * Verifies that the authenticated user has an 'admin' role
 */
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user && req.user.role === 'admin') {
      return next();
    }
    return res.status(403).json({
      success: false,
      error: {
        code: 'FORBIDDEN',
        message: 'Bạn không có quyền quản trị viên (Admin) để thực hiện thao tác này.'
      }
    });
  });
};

/**
 * Optional authentication - attaches req.user if a valid token is present, continues anyway
 */
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch {
    // Ignore invalid/expired token for public access
  }
  next();
};

/**
 * IDOR Protection Helper:
 * Ensures the authenticated user is accessing their OWN resource, or is an admin.
 */
const requireSelfOrAdmin = (getTargetUserId) => {
  return (req, res, next) => {
    verifyToken(req, res, () => {
      const targetUserId = getTargetUserId(req);
      const currentUserId = String(req.user.id);

      if (req.user.role === 'admin' || currentUserId === String(targetUserId)) {
        return next();
      }

      return res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN_IDOR',
          message: 'Từ chối truy cập: Bạn không có quyền xem hoặc chỉnh sửa dữ liệu của tài khoản khác.'
        }
      });
    });
  };
};

module.exports = {
  verifyToken,
  verifyAdmin,
  optionalAuth,
  requireSelfOrAdmin,
  JWT_SECRET
};
