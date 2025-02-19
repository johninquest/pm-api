// routes/userRoutes.js
import express from 'express';
import { validateDTO } from '../middleware/validate.js';
import { userDTO } from '../dtos/userDto.js';

const router = express.Router();

// Temporary storage
const users = [];

router.post('/', validateDTO(userDTO.validate), (req, res) => {
  const user = {
    id: users.length + 1,
    ...req.body,
    createdAt: new Date()
  };
  
  users.push(user);
  res.status(201).json(userDTO.toResponse(user));
});

router.get('/', (req, res) => {
  res.json(users.map(user => userDTO.toResponse(user)));
});

router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  
  res.json(userDTO.toResponse(user));
});

export default router;