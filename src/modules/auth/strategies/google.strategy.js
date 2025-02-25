// src/modules/auth/strategies/google.strategy.js
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import { AuthService } from '../auth.service.js';

const authService = new AuthService();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.API_URL}/api/auth/google/callback`,
    scope: ['profile', 'email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await authService.findOrCreateSocialUser(profile, 'google');
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));