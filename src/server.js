// src/server.js
import app from "./app.js";
import { initializeDatabase } from "./config/database.js";
import Logger from "./config/logger.js";
import "dotenv/config";

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    Logger.info("Attempting to initialize database");
    await initializeDatabase();
    Logger.info("Database initialization completed");

    app.listen(port, () => {
      Logger.info(`Server running on port => ${port}`);
      Logger.info(`Swagger docs available at http://localhost:${port}/api-docs`);
      Logger.info(`Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    Logger.error("Failed to initialize application", error);
    process.exit(1);
  }
};

startServer();
