/* 
import Logger from "../config/logger.js";

// General-purpose error handling middleware
const errorHandler = (err, req, res, next) => {
  Logger.error(`Error processing ${req.method} ${req.url}: ${err.stack}`);

  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    status: "error",
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorHandler;
*/ 

import Logger from '../config/logger.js';
import { AppError } from '../utils/errors.js';

// Handle specific known errors
const handleSequelizeValidationError = (err) => {
  const message = err.errors.map(error => error.message).join('. ');
  return new AppError(message, 400);
};

const handleSequelizeUniqueConstraintError = (err) => {
  const message = `Duplicate field value: ${err.errors[0].value}`;
  return new AppError(message, 400);
};

const handleJWTError = () => {
  return new AppError('Invalid token. Please log in again.', 401);
};

const handleJWTExpiredError = () => {
  return new AppError('Your token has expired. Please log in again.', 401);
};

// Development error response
const sendErrorDev = (err, res) => {
  Logger.error('Error:', {
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });

  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

// Production error response
const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    Logger.error('Operational Error:', {
      status: err.status,
      message: err.message
    });

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } 
  // Programming or other unknown error: don't leak error details
  else {
    Logger.error('Unknown Error:', err);

    res.status(500).json({
      status: 'error',
      message: 'Something went wrong'
    });
  }
};

// Main error handling middleware
export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    let error = { ...err };
    error.message = err.message;

    // Handle specific error types
    if (error.name === 'SequelizeValidationError') error = handleSequelizeValidationError(error);
    if (error.name === 'SequelizeUniqueConstraintError') error = handleSequelizeUniqueConstraintError(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};