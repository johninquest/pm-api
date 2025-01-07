// validators/property.validator.js
import Joi from "joi";

const propertyTypes = [
  "commercial",
  "industrial",
  "land",
  "mixedUse",
  "multiFamily",
  "multiUnit",
  "singleFamily",
  "singleUnit",
];

const propertySchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string()
    .valid(...propertyTypes)
    .required(),
  numberOfUnits: Joi.number().integer().min(1).required(),
  constructionYear: Joi.string()
    .pattern(/^\d{4}$/)
    .allow("", null),
  currentValue: Joi.number().min(0).allow(null),
  city: Joi.string().required(),
  country: Joi.string().required(),
  street: Joi.string().allow("", null),
  postcode: Joi.string().allow("", null),
  state: Joi.string().allow("", null),
  createdBy: Joi.string().required(),
}).required();

// Middleware function for validation
export const validateProperty = (req, res, next) => {
  const { error } = propertySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// If you need to export the schema itself
export { propertySchema };
