// src/modules/user/user.routes.js
import express from 'express'; 
import { verifyFirebaseToken } from '../../shared/config/firebase.js';


const router = express.Router();

// Route to get the currently logged-in user's information
router.get('/me', verifyFirebaseToken, (req, res) => {
  const user = req.user;
  res.json({
    uid: user.uid,
    email: user.email,
    roles: user.roles,
  });
});

export default router;