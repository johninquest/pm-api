// src/modules/auth/auth.service.js
// import passport from 'passport';
import jwt from 'jsonwebtoken';
import { User } from '../user/user.model.js';

export class AuthService {
  generateToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
  }

  async findOrCreateSocialUser(profile, provider) {
    // Find existing user or create new one based on social profile
    const existingUser = await User.findOne({ 
      where: { 
        email: profile.emails[0].value 
      }
    });

    if (existingUser) {
      // Update social provider information if needed
      return existingUser;
    }

    // Create new user
    return User.create({
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      [provider + 'Id']: profile.id,
      avatar: profile.photos?.[0]?.value,
      isVerified: true // Auto-verify social users
    });
  }
}