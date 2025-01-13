// validators/user.validator.js
import Joi from "joi";

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  firstname: Joi.string().allow("", null),
  lastname: Joi.string().allow("", null),
  role: Joi.string().allow("", null),
  country: Joi.string().allow("", null),
  phone: Joi.string().allow("", null),
  avatar: Joi.string().allow("", null)
}).required();

export const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export { userSchema };