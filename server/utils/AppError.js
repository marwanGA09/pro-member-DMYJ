class AppError extends Error {
  constructor(message, statusCode = 500) {
    const typeOfMessage = typeof message === 'string';
    // message = typeOfMessage ? message : JSON.stringify(message);
    // console.log('boolean from ap error', typeof message);
    super(typeOfMessage ? message : JSON.stringify(message));
    this.statusCode = statusCode;
    this.status = statusCode * 1 >= 500 ? 'Error' : 'Failure';
    this.isOperational = true;
    this.isString = typeOfMessage;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
