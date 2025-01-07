// src/routes/property.routes.js
import { Router } from 'express';
import { validateProperty } from '../validators/property.validator.js';
import Property from '../models/property.model.js'; 
import PropertyRepository from '../repositories/property.repository.js';
import Logger from '../config/logger.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Property:
 *       type: object
 *       required:
 *         - name
 *         - type
 *         - numberOfUnits
 *         - city
 *         - country
 *         - createdBy
 *       properties:
 *         id:
 *           type: integer
 *           readOnly: true
 *           example: 1
 *         name:
 *           type: string
 *           example: "Sunset Apartments"
 *         type:
 *           type: string
 *           enum: [singleFamily, multiFamily, multiUnit, mixedUse, commercial, industrial]
 *           example: "multiUnit"
 *         numberOfUnits:
 *           type: integer
 *           minimum: 1
 *           example: 4
 *         constructionYear:
 *           type: string
 *           nullable: true
 *           example: "2020"
 *         currentValue:
 *           type: number
 *           nullable: true
 *           example: 500000
 *         city:
 *           type: string
 *           example: "New York"
 *         country:
 *           type: string
 *           example: "USA"
 *         street:
 *           type: string
 *           nullable: true
 *           example: "123 Main St"
 *         postcode:
 *           type: string
 *           nullable: true
 *           example: "10001"
 *         state:
 *           type: string
 *           nullable: true
 *           example: "NY"
 *         createdBy:
 *           type: string
 *           example: "user@example.com"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 */

/**
 * @swagger
 * /api/properties:
 *   post:
 *     tags: [properties]
 *     summary: Create a new property
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Property'
 *     responses:
 *       201:
 *         description: Property created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Property created successfully"
 *                 property:
 *                   $ref: '#/components/schemas/Property'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Validation error"
 */
router.post('/', validateProperty, async (req, res, next) => {
  try {
    // Prepare the property data from the request body
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

    // Create the property
    const property = await Property.create(propertyData);

    // Log the creation
    Logger.info('Property created successfully', { propertyId: property.id });

    // Respond with the created property
    res.status(201).json({ 
      message: "Property created successfully",
      property: property
    });
  } catch (error) {
    // Log the error
    Logger.error('Failed to create property', { error: error.message });

    // Pass to error handling middleware
    next(error);
  }
});

/**
 * @swagger
 * /api/properties:
 *   get:
 *     tags: [properties]
 *     summary: List all properties
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Property'
 */
router.get('/', async (req, res, next) => {
  try {
    const properties = await Property.findAll();
    res.json(properties);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/properties/total-value:
 *   get:
 *     tags: [properties]
 *     summary: Get total property value for a user
 *     description: Calculates the total value of properties owned by a specific user
 *     parameters:
 *       - in: query
 *         name: userEmail
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: Email of the user whose property value to calculate
 *     responses:
 *       200:
 *         description: Successfully calculated total property value
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalValue:
 *                   type: number
 *                   description: Total value of all properties
 *                   example: 1500000.50
 *                 propertyCount:
 *                   type: integer
 *                   description: Number of properties owned
 *                   example: 3
 *                 properties:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Property'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "User email is required"
 *       404:
 *         description: No properties found for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "No properties found for this user"
 */
router.get('/total-value', async (req, res, next) => {
  try {
    console.log('===== ROUTE: Total Value =====');
    console.log('Original Query parameters:', req.query);

    const { userEmail } = req.query;

    // Decode the URL-encoded email
    const decodedEmail = decodeURIComponent(userEmail);
    console.log('Decoded email:', decodedEmail);

    // Validate email
    if (!decodedEmail) {
      console.log('No email provided');
      return res.status(400).json({
        status: 'error',
        message: 'User email is required'
      });
    }

    // Trim and clean the email
    const cleanedEmail = decodedEmail.trim();
    console.log('Cleaned email:', cleanedEmail);

    // Use the repository method
    const result = await PropertyRepository.getUserPropertyTotalValue(cleanedEmail);

    // Log the operation
    console.log('Calculation result:', JSON.stringify(result, null, 2));

    // Return the result
    res.json(result);
  } catch (error) {
    console.error('Full error in route:', error);

    // Handle specific not found error
    if (error.status === 404) {
      return res.status(404).json({
        status: 'error',
        message: error.message
      });
    }
    
    // Pass to error handling middleware
    next(error);
  }
});

/**
 * @swagger
 * /api/properties/{id}:
 *   get:
 *     tags: [properties]
 *     summary: Get a property by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Property ID
 *     responses:
 *       200:
 *         description: Property found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 *       404:
 *         description: Property not found
 */
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


export default router;