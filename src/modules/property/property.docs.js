// src/modules/property/property.docs.js

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

export const propertyRoutesDocs = {
    createProperty: {
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
       *       400:
       *         description: Invalid input
       */
    },
    
    getAllProperties: {
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
    },
  
    getTotalValue: {
      /**
       * @swagger
       * /api/properties/total-value:
       *   get:
       *     tags: [properties]
       *     summary: Get total property value for a user
       *     parameters:
       *       - in: query
       *         name: userEmail
       *         required: true
       *         schema:
       *           type: string
       *           format: email
       *     responses:
       *       200:
       *         description: Successfully calculated total value
       *       400:
       *         description: Bad request
       *       404:
       *         description: No properties found
       */
    },
  
    getPropertyById: {
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
       *     responses:
       *       200:
       *         description: Property found
       *       404:
       *         description: Property not found
       */
    },
  
    updateProperty: {
      /**
       * @swagger
       * /api/properties/{id}:
       *   patch:
       *     tags: [properties]
       *     summary: Update property fields
       *     parameters:
       *       - in: path
       *         name: id
       *         required: true
       *         schema:
       *           type: string
       *     requestBody:
       *       required: true
       *       content:
       *         application/json:
       *           schema:
       *             type: object
       *             properties:
       *               name:
       *                 type: string
       *               type:
       *                 type: string
       *               numberOfUnits:
       *                 type: integer
       *               constructionYear:
       *                 type: string
       *               currentValue:
       *                 type: number
       *               city:
       *                 type: string
       *               country:
       *                 type: string
       *               street:
       *                 type: string
       *               postcode:
       *                 type: string
       *               state:
       *                 type: string
       *     responses:
       *       200:
       *         description: Property updated successfully
       *       404:
       *         description: Property not found
       *       400:
       *         description: Invalid input
       */
    }
  };