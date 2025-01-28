// src/app.js
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import { initializeDatabase } from "./config/database.js";
import "dotenv/config";
import cors from "cors";
import Logger from "./config/logger.js";
import { specs, swaggerUi } from "./config/swagger.js";
import propertyRoutes from "./routes/property.routes.js";

// Initialize database before setting up routes
const initApp = async () => {
  try {
    Logger.info("Attempting to initialize database");
    await initializeDatabase();
    Logger.info("Database initialization completed");

    const app = express();
    const port = process.env.PORT || 3000;

    // Middleware
    /* app.use(express.json()); */
    app.use(
      cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
      })
    );

    // Custom JSON parser with error handling
    app.use((req, res, next) => {
      express.json()(req, res, (err) => {
        if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
          Logger.error(`Invalid JSON payload: ${err.message}`);
          return res.status(400).json({
            status: "error",
            message: "Invalid JSON format",
            details: err.message,
          });
        }
        next();
      });
    });

    // Logging middleware remains the same
    app.use((req, res, next) => {
      const start = Date.now();

      Logger.http(
        `Incoming ${req.method} ${req.url} ${JSON.stringify(req.body)}`
      );

      res.on("finish", () => {
        const duration = Date.now() - start;
        Logger.http(
          `Finished ${req.method} ${req.url} ${res.statusCode} ${duration}ms`
        );
      });

      next();
    });

    // Swagger docs
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

    // Auth routes (should be before protected routes)
    app.use("/api/auth", authRoutes);

    // Routes
    app.use("/api/properties", propertyRoutes);

    // Health check
    app.get("/", (req, res) => {
      Logger.info("Health check endpoint called");
      res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      });
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
      Logger.error(`Error processing ${req.method} ${req.url}: ${err.stack}`);

      const statusCode = err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      res.status(statusCode).json({
        status: "error",
        message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
      });
    });

    // Start server
    app.listen(port, () => {
      Logger.info(`Server running on port => ${port}`);
      Logger.info(
        `Swagger docs available at http://localhost:${port}/api-docs`
      );
      Logger.info(`Environment: ${process.env.NODE_ENV}`);
    });

    return app;
  } catch (error) {
    Logger.error("Failed to initialize application", error);
    process.exit(1);
  }
};

export default initApp();
