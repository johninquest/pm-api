// config/passport.js
import passport from "passport"; 
import "dotenv/config";
// import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"; 
import Logger from './logger.js'; 
// import bcrypt from "bcryptjs";


// Temporary user storage (replace with database later)
const users = [];

export const setupPassport = () => {

  // Local Strategy
  /*   passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = users.find((u) => u.email === email);
          if (!user) {
            return done(null, false, { message: "Invalid credentials" });
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return done(null, false, { message: "Invalid credentials" });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  ); */

  // JWT Strategy
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (payload, done) => {
        try {
          // Here you'll validate the JWT and find the user
          // For now, we'll just pass the payload
          return done(null, payload);
        } catch (error) {
          Logger.error("JWT validation error:", error);
          return done(error, false);
        }
      }
    )
  );

  // Google Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Here you'll handle the user data from Google
          // For now, we'll just pass the profile
          const user = {
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            picture: profile.photos[0].value,
          };

          Logger.info(`Google auth successful for user: ${user.email}`);
          return done(null, user);
        } catch (error) {
          Logger.error("Google authentication error:", error);
          return done(error, false);
        }
      }
    )
  );

  return passport;
};
