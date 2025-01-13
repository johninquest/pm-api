// validators/tenant.validator.js
import Joi from "joi";

const tenantSchema = Joi.object({
  nationalIdNumber: Joi.string().allow("", null),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  address: Joi.object({
    street: Joi.string().allow("", null),
    city: Joi.string().required(),
    state: Joi.string().allow("", null),
    country: Joi.string().required(),
    postcode: Joi.string().allow("", null)
  }).required(),
  propertyId: Joi.string().required(),
  unitId: Joi.string().allow("", null),
  leaseStartDate: Joi.date().iso().required(),
  leaseEndDate: Joi.date().iso().required(),
  rentAmount: Joi.number().min(0).required(),
  paymentFrequency: Joi.number().integer().min(1).required(),
  paymentMethod: Joi.string().required()
}).required();

export const validateTenant = (req, res, next) => {
  const { error } = tenantSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export { tenantSchema };