import express from "express";
import passport from "passport";
// import mongoose from 'mongoose';
import "dotenv/config";
import cors from 'cors';  
import { setupPassport } from "./config/passport.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import Logger from "./config/logger.js";

const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors({                    // Add cors here
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// Setup passport
setupPassport();
app.use(passport.initialize());

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// Logger
app.use((req, res, next) => {
  Logger.http(`${req.method} ${req.url}`);
  next();
});

// Basic health check
app.get("/", (req, res) => {
  Logger.info("Health check endpoint called");
  res.json({ status: `Server is running on port => ${port}` });
});

// Connect to MongoDB
/* mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err)); */ 

// Error handling
/* app.use((err, req, res, next) => {
  Logger.error(`Error: ${err.message}`);
  res.status(500).json({ error: 'Internal Server Error' });
}); */

app.listen(port, () => {
  console.log(`Server running on port => ${port}`);
});
