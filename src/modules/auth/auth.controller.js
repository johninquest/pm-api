// src/modules/auth/auth.controller.js
import passport from 'passport';
import { AuthService } from './auth.service.js';

export class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  // Initiate Google auth
  googleAuth(req, res, next) {
    passport.authenticate('google', { 
      scope: ['profile', 'email'] 
    })(req, res, next);
  }

  // Google auth callback
  googleCallback(req, res, next) {
    passport.authenticate('google', { 
      session: false,
      failureRedirect: `${process.env.CLIENT_URL}/login?error=social-auth-failed` 
    }, (err, user) => {
      if (err || !user) {
        return res.redirect(`${process.env.CLIENT_URL}/login?error=social-auth-failed`);
      }

      // Generate JWT
      const token = this.authService.generateToken(user);
      
      // Redirect to frontend with token
      return res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);
    })(req, res, next);
  }
}