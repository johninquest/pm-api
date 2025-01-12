// src/config/firebase.js
import admin from 'firebase-admin';
import "dotenv/config";

// Load service account from environment variable or file
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');

// Initialize Firebase Admin SDK
const initFirebase = () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }
  return admin;
};

// Firebase authentication middleware
export const verifyFirebaseToken = async (req, res, next) => {
  const idToken = req.headers.authorization?.split('Bearer ')[1];
  
  if (!idToken) {
    return res.status(403).json({ error: 'No token provided' });
  }

  try {
    const firebase = initFirebase();
    const decodedToken = await firebase.auth().verifyIdToken(idToken);
    
    // Attach user information to request
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      roles: decodedToken.roles || [] // Custom claim for roles
    };

    next();
  } catch (error) {
    console.error('Firebase token verification error:', error);
    res.status(403).json({ error: 'Unauthorized' });
  }
};

export default initFirebase;