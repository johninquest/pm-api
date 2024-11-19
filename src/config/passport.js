// config/passport.js
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

// Temporary user storage (replace with database later)
const users = [];

export const setupPassport = () => {
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = users.find(u => u.email === email);
    if (!user) {
      return done(null, false, { message: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: 'Invalid credentials' });
    }
    
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = users.find(u => u.googleId === profile.id);
    
    if (!user) {
      user = {
        id: users.length + 1,
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName
      };
      users.push(user);
    }
    
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
  try {
    const user = users.find(u => u.id === payload.userId);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

return passport;

};

// export default passport;