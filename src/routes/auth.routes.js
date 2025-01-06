// src/routes/auth.js
import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { userDTO } from '../dtos/userDto.js';
import Logger from '../config/logger.js';

const router = express.Router();

// Start Google OAuth flow
router.get('/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    prompt: 'select_account'
  })
);

// Google OAuth callback
router.get('/google/callback',
  passport.authenticate('google', { 
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/auth/callback?error=true` 
  }),
  (req, res) => {
    try {
      const token = jwt.sign(
        { 
          userId: req.user.googleId,
          email: req.user.email,
          name: req.user.name
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      console.log('Backend - Generated token:', token); // Debug log

      res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);
    } catch (error) {
      console.error('Backend - Token generation error:', error);
      res.redirect(`${process.env.CLIENT_URL}/auth/callback?error=true`);
    }
  }
);

// Test protected route
router.get('/profile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json(userDTO.toResponse(req.user));
  }
); 

// Add this test endpoint
router.get('/test', 
  passport.authenticate('jwt', { session: false }), 
  (req, res) => {
    res.json({
      message: 'Authentication successful',
      user: req.user
    });
});

export default router;