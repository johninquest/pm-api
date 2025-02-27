/* import { sendEmail } from '../email/email.service.js';
import User from './user.model.js';

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = await User.create({ email, password });

    // Send a welcome email
    await sendEmail(
      newUser.email,
      'Welcome to Our Service',
      'Thank you for registering!',
      '<p>Thank you for registering!</p>'
    );

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
}; */