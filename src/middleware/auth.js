// src/middleware/auth.js
const admin = require('firebase-admin');

// Middleware to verify Firebase token and check roles
const checkRole = (requiredRoles) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split('Bearer ')[1];
      if (!token) {
        return res.status(401).json({ error: 'No token provided' });
      }

      const decodedToken = await admin.auth().verifyIdToken(token);
      
      // Custom claims in Firebase token contain roles
      const userRoles = decodedToken.roles || [];
      const hasPermission = requiredRoles.some(role => userRoles.includes(role));

      if (!hasPermission) {
        return res.status(403).json({ error: 'Insufficient permissions' });
      }

      // Attach user info to request
      req.user = {
        uid: decodedToken.uid,
        roles: userRoles
      };

      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
};