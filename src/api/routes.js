/* // api/routes.js 
import {propertyRoutes} from './property/routes';
import {userRoutes} from './user/routes'; 

export function setupRoutes(app) {
  app.use('/property', propertyRoutes);
  app.use('/user', userRoutes);
} */

import propertyRoutes from "../modules/property/property.routes.js";
import userRoutes from "../modules/user/user.routes.js";
import { specs, swaggerUi } from "../shared/config/swagger.js";
import Logger from "../shared/config/logger.js";

export function setupRoutes(app) {
  // API routes
  app.use("/api/properties", propertyRoutes);
  app.use("/api/users", userRoutes);

  // Swagger documentation
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

  // Health check route
  app.get("/", (req, res) => {
    try {
      Logger.info("Health check endpoint called");
      res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      });
    } catch (error) {
      Logger.error(`Health check error: ${error.message}`);
      res.status(500).json({
        status: "error",
        message: "Health check failed",
        timestamp: new Date().toISOString(),
      });
    }
  });
}
