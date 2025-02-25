// src/repositories/property.repository.js
// import { Op } from 'sequelize';
import Property from './property.model.js';

class PropertyRepository {
  async getUserPropertyTotalValue(userEmail) {
    console.log('===== DEBUG: Total Value Calculation =====');
    console.log('Input userEmail:', userEmail);

    // Check if userEmail is exactly correct
    console.log('All properties in database:');
    const allProperties = await Property.findAll();
    console.log(JSON.stringify(allProperties, null, 2));

    // Log unique createdBy values
    const uniqueCreatedBy = [...new Set(allProperties.map(p => p.createdBy))];
    console.log('Unique createdBy values:', uniqueCreatedBy);

    // Find all properties for the user
    const properties = await Property.findAll({
      where: { 
        createdBy: userEmail
      }
    });

    console.log('Found properties:', JSON.stringify(properties, null, 2));

    // If no properties found, throw a not found error
    if (properties.length === 0) {
      const error = new Error('No properties found for this user');
      error.status = 404;
      throw error;
    }

    // Calculate total value
    const totalValue = properties.reduce((sum, property) => {
      return sum + (property.currentValue || 0);
    }, 0);

    return {
      totalValue: Number(totalValue.toFixed(2)),
      propertyCount: properties.length,
      properties: properties
    };
  }
}

export default new PropertyRepository();