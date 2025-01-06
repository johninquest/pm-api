// config/auth.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authConfig = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiration: '24h',
  
  generateToken(userId) {
    return jwt.sign({ userId }, this.jwtSecret, {
      expiresIn: this.jwtExpiration
    });
  },
  
  verifyToken(token) {
    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
};

console.log('Jwt secret', process.env.JWT_SECRET)