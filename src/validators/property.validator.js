// src/validators/property.validator.js

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

// Original create validator schema (keep this)
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

// New update validator schema
const propertyUpdateSchema = Joi.object({
  name: Joi.string(),
  type: Joi.string().valid(...propertyTypes),
  numberOfUnits: Joi.number().integer().min(1),
  constructionYear: Joi.string()
    .pattern(/^\d{4}$/)
    .allow("", null),
  currentValue: Joi.number().min(0).allow(null),
  city: Joi.string(),
  country: Joi.string(),
  street: Joi.string().allow("", null),
  postcode: Joi.string().allow("", null),
  state: Joi.string().allow("", null)
})
.min(1) // Require at least one field to be present
.required(); // The object itself is required

// Middleware function for creation validation
export const validateProperty = (req, res, next) => {
  const { error } = propertySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      status: 'error',
      message: error.details[0].message 
    });
  }
  next();
};

// Middleware function for update validation
export const validatePropertyUpdate = (req, res, next) => {
  const { error } = propertyUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      status: 'error',
      message: error.details[0].message 
    });
  }
  next();
};

export { propertySchema, propertyUpdateSchema };