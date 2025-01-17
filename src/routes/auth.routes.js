// src/routes/auth.routes.js
import { Router } from 'express';
import { validateUser } from '../validators/user.validator.js';
import { verifyFirebaseToken } from '../config/firebase.js';
import User from '../models/user.model.js';
import Logger from '../config/logger.js';

const router = Router();

// Login/Register with Firebase token
router.post('/login', verifyFirebaseToken, async (req, res, next) => {
  try {
    // Find or create user in our database
    let user = await User.findOne({ where: { firebaseUid: req.user.uid } });
    
    if (!user) {
      // Create new user if doesn't exist
      user = await User.create({
        firebaseUid: req.user.uid,
        email: req.user.email,
        roles: req.user.roles
      });
      Logger.info('New user created', { userId: user.id });
    }

    res.json({
      message: 'Authentication successful',
      user: {
        id: user.id,
        email: user.email,
        roles: user.roles
      }
    });
  } catch (error) {
    Logger.error('Authentication error', { error: error.message });
    next(error);
  }
});

// Verify session
router.get('/session', verifyFirebaseToken, async (req, res) => {
  res.json({ 
    authenticated: true,
    user: req.user 
  });
});

export default router;