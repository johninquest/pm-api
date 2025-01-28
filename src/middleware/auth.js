import { verifyFirebaseToken } from '../config/firebase.js';

export const requireAuth = () => verifyFirebaseToken;

export const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    if (!req.user.roles.includes(role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
};