// src/app.js
import express from "express"; 
import helmet from "helmet"; // Import helmet
import authRoutes from "./routes/authRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import { specs, swaggerUi } from "./config/swagger.js";
import cors from "cors";
import Logger from "./config/logger.js"; 
import errorHandler from "./middleware/error.js"; // 

const app = express(); 

// Security Middleware
// app.use(helmet()); 
app.use(
  helmet({
    contentSecurityPolicy: false, // Avoid blocking inline scripts in dev
    frameguard: false, // APIs don’t need this
    hsts: false, // Don't enforce HTTPS in dev (use it in production)
    referrerPolicy: { policy: "no-referrer" },
  })
); 

// Middleware
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


app.use((req, res, next) => {
  const start = Date.now();
  
  try {
    Logger.http(`Incoming ${req.method} ${req.url} ${JSON.stringify(req.body)}`);
    res.on('finish', () => {
      const duration = Date.now() - start;
      Logger.http(`Finished ${req.method} ${req.url} ${res.statusCode} ${duration}ms`);
    });

    next();
  } catch (error) {
    Logger.error(`Error in logging middleware: ${error.message}`);
    next(error);
  }
});

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Auth routes (should be before protected routes)
app.use("/api/auth", authRoutes);

// Property routes
app.use("/api/properties", propertyRoutes);

// Health check
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
      timestamp: new Date().toISOString()
    });
  }
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

export default app;