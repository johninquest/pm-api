// src/validators/user.validator.js
import Joi from 'joi';

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  roles: Joi.array().items(Joi.string()).default(['user'])
}).required();

export const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};