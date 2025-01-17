// src/routes/property.routes.js
import { Router } from 'express';
import { validateProperty, validatePropertyUpdate } from '../validators/property.validator.js';
import Property from '../models/property.model.js';
import PropertyRepository from '../repositories/property.repository.js';
import Logger from '../config/logger.js';
import '../docs/property.docs.js';  // Import swagger docs

const router = Router();

// Create property
router.post('/', validateProperty, async (req, res, next) => {
  try {
    const propertyData = {
      name: req.body.name,
      type: req.body.type,
      numberOfUnits: req.body.numberOfUnits,
      constructionYear: req.body.constructionYear,
      currentValue: req.body.currentValue,
      city: req.body.city,
      country: req.body.country,
      street: req.body.street,
      postcode: req.body.postcode,
      state: req.body.state,
      createdBy: req.body.createdBy,
    };

    const property = await Property.create(propertyData);
    Logger.info('Property created successfully', { propertyId: property.id });

    res.status(201).json({ 
      message: "Property created successfully",
      property: property
    });
  } catch (error) {
    Logger.error('Failed to create property', { error: error.message });
    next(error);
  }
});

// Get all properties
router.get('/', async (req, res, next) => {
  try {
    const properties = await Property.findAll();
    res.json(properties);
  } catch (error) {
    next(error);
  }
});

// Get total value
router.get('/total-value', async (req, res, next) => {
  try {
    const { userEmail } = req.query;
    const decodedEmail = decodeURIComponent(userEmail);

    if (!decodedEmail) {
      return res.status(400).json({
        status: 'error',
        message: 'User email is required'
      });
    }

    const cleanedEmail = decodedEmail.trim();
    const result = await PropertyRepository.getUserPropertyTotalValue(cleanedEmail);
    res.json(result);
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).json({
        status: 'error',
        message: error.message
      });
    }
    next(error);
  }
});

// Get property by ID
router.get('/:id', async (req, res, next) => {
  try {
    const property = await Property.findByPk(req.params.id);
    
    if (!property) {
      return res.status(404).json({ 
        message: 'Property not found' 
      });
    }

    res.json(property);
  } catch (error) {
    next(error);
  }
});

// Update property (PATCH)
router.patch('/:id', validatePropertyUpdate, async (req, res, next) => {
  try {
    const property = await Property.findByPk(req.params.id);
    
    if (!property) {
      return res.status(404).json({ 
        status: 'error',
        message: 'Property not found' 
      });
    }

    // Only update the fields that were provided
    const updateFields = {};
    for (const [key, value] of Object.entries(req.body)) {
      if (property.rawAttributes.hasOwnProperty(key)) {
        updateFields[key] = value;
      }
    }

    await property.update(updateFields);

    Logger.info('Property updated successfully', { 
      propertyId: property.id,
      updatedFields: Object.keys(updateFields)
    });

    res.json({ 
      message: "Property updated successfully",
      property: property
    });
  } catch (error) {
    Logger.error('Failed to update property', { 
      propertyId: req.params.id,
      error: error.message 
    });
    next(error);
  }
});

export default router;