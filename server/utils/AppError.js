class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode * 1 >= 500 ? 'Error' : 'Failure';
    this.operational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
