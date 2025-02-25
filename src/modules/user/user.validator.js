// src/modules/user/user.validator.js
import Joi from 'joi';

const userSchema = Joi.object({
    firebaseUid: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid('admin', 'user').default('user'),
    lastLogin: Joi.date().optional()
  }).required();
  
  export const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };