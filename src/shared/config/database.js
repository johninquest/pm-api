// src/shared/config/database.js
import { Sequelize } from 'sequelize';
import Logger from './logger.js';
import dotenv from 'dotenv';

dotenv.config();

// Create Sequelize instance
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // You can enable logging if needed
});

// Test the connection
export const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    Logger.info('Database connection established successfully.');
    
    // Sync models (creates tables if they don't exist)
    await sequelize.sync();
    Logger.info('All models were synchronized successfully.');
    
    return sequelize;
  } catch (error) {
    Logger.error('Unable to connect to the database:', error);
    throw error;
  }
};

export default sequelize;