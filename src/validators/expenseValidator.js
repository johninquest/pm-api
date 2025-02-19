// validators/expense.validator.js
import Joi from "joi";

const expenseSchema = Joi.object({
  propertyName: Joi.string().required(),
  dateOfExpense: Joi.date().iso().required(),
  expenseType: Joi.string().required(),
  description: Joi.string().allow("", null),
  amount: Joi.number().min(0).required(),
  vendor: Joi.string().allow("", null),
  createdBy: Joi.string().required()
}).required();

export const validateExpense = (req, res, next) => {
  const { error } = expenseSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export { expenseSchema };