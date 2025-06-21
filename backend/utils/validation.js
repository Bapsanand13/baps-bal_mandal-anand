import { AppError } from './errorHandler.js';

// Validation middleware
export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      return next(new AppError(errorMessage, 400));
    }
    next();
  };
};

// Common validation patterns
export const validationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\+]?[1-9][\d]{0,15}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  date: /^\d{4}-\d{2}-\d{2}$/,
  time: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
};

// Validation messages
export const validationMessages = {
  email: 'Please provide a valid email address',
  phone: 'Please provide a valid phone number',
  password: 'Password must be at least 8 characters with uppercase, lowercase, number and special character',
  required: 'This field is required',
  minLength: (field, min) => `${field} must be at least ${min} characters`,
  maxLength: (field, max) => `${field} must be no more than ${max} characters`,
  invalidFormat: (field) => `Invalid ${field} format`,
  invalidValue: (field) => `Invalid ${field} value`
};

// Sanitize input data
export const sanitizeInput = (data) => {
  if (typeof data === 'string') {
    return data.trim().replace(/[<>]/g, '');
  }
  if (typeof data === 'object' && data !== null) {
    const sanitized = {};
    for (const [key, value] of Object.entries(data)) {
      sanitized[key] = sanitizeInput(value);
    }
    return sanitized;
  }
  return data;
};

// Validate file upload
export const validateFile = (file, allowedTypes = ['image/jpeg', 'image/png', 'image/gif'], maxSize = 5 * 1024 * 1024) => {
  if (!file) {
    throw new AppError('No file uploaded', 400);
  }

  if (!allowedTypes.includes(file.mimetype)) {
    throw new AppError('Invalid file type', 400);
  }

  if (file.size > maxSize) {
    throw new AppError('File too large', 400);
  }

  return true;
};

// Validate pagination parameters
export const validatePagination = (page, limit) => {
  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 10;
  
  if (pageNum < 1) {
    throw new AppError('Page number must be greater than 0', 400);
  }
  
  if (limitNum < 1 || limitNum > 100) {
    throw new AppError('Limit must be between 1 and 100', 400);
  }
  
  return { page: pageNum, limit: limitNum };
}; 