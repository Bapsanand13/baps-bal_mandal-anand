import jwt from 'jsonwebtoken';

// Protect routes - require authentication
export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided.' });
  }
  
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (_) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

// Admin middleware - require admin or superadmin role
export const admin = (req, res, next) => {
  if (!['admin', 'superadmin'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden: admin access required.' });
  }
  next();
};

// Volunteer middleware - require volunteer, admin, or superadmin role
export const volunteer = (req, res, next) => {
  if (!['volunteer', 'admin', 'superadmin'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden: volunteer access required.' });
  }
  next();
};

// SuperAdmin middleware - require superadmin role
export const superAdmin = (req, res, next) => {
  if (req.user.role !== 'superadmin') {
    return res.status(403).json({ message: 'Forbidden: superadmin access required.' });
  }
  next();
};

// Moderator middleware - require moderator or admin role
export const moderator = (req, res, next) => {
  if (!['admin', 'moderator'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden: moderator access required.' });
  }
  next();
};

// Role-based middleware - require specific role(s)
export const authorize = (roles = []) => {
  // roles param can be a single role string (e.g. 'admin') or an array of roles
  if (typeof roles === 'string') {
    roles = [roles];
  }
  
  return (req, res, next) => {
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: insufficient role.' });
    }
    next();
  };
};

// Legacy export for backward compatibility
const auth = (roles = []) => {
  // roles param can be a single role string (e.g. 'admin') or an array of roles
  if (typeof roles === 'string') {
    roles = [roles];
  }
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided.' });
    }
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Forbidden: insufficient role.' });
      }
      next();
    } catch (_) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
  };
};

export default auth; 