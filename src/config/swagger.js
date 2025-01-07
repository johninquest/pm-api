// src/config/swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swagger from 'swagger-ui-express';  // Changed import name

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Property Management API',
      version: '1.0.0',
      description: 'Simple API for managing properties'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ]
  },
  apis: ['./src/routes/*.js']
};

const specs = swaggerJsdoc(options);

// Export with different names to avoid conflict
export { specs, swagger as swaggerUi };