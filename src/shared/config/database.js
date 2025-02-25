// src/config/database.js
import { Sequelize } from 'sequelize';
import Logger from './logger.js';
import fs from 'fs';
import path from 'path';

// Ensure data directory exists
const dataDir = path.resolve('data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Create Sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve('data/sqlite.db'),
  // logging: msg => Logger.info(msg) 
  logging: false
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