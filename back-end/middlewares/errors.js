const ErrorHandler = require("../utils/errorHandler");

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  // err.message = err.message || `Internal server error`;

  // this condition for development mode error handling.
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }
  // this condition for production mode error handling.
  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };

    error.message = err.message;
    res.status(error.statusCode).json({
      success: false,
      message: err.message || `Internal server error`,
    });
  }
};
module.exports = errorMiddleware;
