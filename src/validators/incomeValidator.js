// validators/income.validator.js
import Joi from "joi";

const incomeSchema = Joi.object({
  source: Joi.string().required(),
  amount: Joi.number().min(0).required(),
  paymentDate: Joi.date().iso().required(),
  propertyId: Joi.string().required(),  // Changed to required
  unitId: Joi.string().allow("", null),
  tenantId: Joi.string().required(),    // Changed to required
  createdBy: Joi.string().required()
}).required();

export const validateIncome = (req, res, next) => {
  const { error } = incomeSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export { incomeSchema };