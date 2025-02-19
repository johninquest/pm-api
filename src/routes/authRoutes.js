// src/routes/auth.routes.js
import { Router } from 'express';
import { validateUser } from '../validators/userValidator.js';
import { verifyFirebaseToken } from '../config/firebase.js';
import User from '../schemas/userSchema.js';
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
        roles: req.user.roles || ['user'] // Default role
      });
      Logger.info('New user created', { userId: user.id });
    }

    res.json({
      message: 'Authentication successful',
      user: {
        id: user.id,
        email: user.email,
        roles: user.roles,
        firebaseUid: user.firebaseUid
      }
    });
  } catch (error) {
    Logger.error('Authentication error', { error: error.message });
    next(error);
  }
});

// Verify session
router.get('/session', verifyFirebaseToken, async (req, res) => {
  try {
    const user = await User.findOne({ where: { firebaseUid: req.user.uid } });
    
    if (!user) {
      return res.status(404).json({ 
        authenticated: false,
        message: 'User not found in database'
      });
    }

    res.json({ 
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        roles: user.roles,
        firebaseUid: user.firebaseUid
      }
    });
  } catch (error) {
    Logger.error('Session verification error', { error: error.message });
    next(error);
  }
});

// For testing purposes only - REMOVE BEFORE PRODUCTION
router.get('/test-token', async (req, res) => {
  try {
    const firebase = initFirebase();
    // You should replace this with an actual test user UID from your Firebase Console
    const uid = 'test-user-uid';
    const customToken = await firebase.auth().createCustomToken(uid);
    res.json({ token: customToken });
  } catch (error) {
    Logger.error('Test token generation error', { error: error.message });
    res.status(500).json({ error: 'Failed to create test token' });
  }
});

export default router;