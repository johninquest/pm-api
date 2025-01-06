import Joi from 'joi';

export const userDTO = {
  validate(data) {
    const schema = Joi.object({
      username: Joi.string().min(3).max(50).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).required()
    });
    return schema.validate(data);
  },

  toResponse(user) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt
    };
  }
};

export const propertySchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  units: Joi.number().integer().min(1).required(),
  monthlyRent: Joi.number().precision(2).required()
});
