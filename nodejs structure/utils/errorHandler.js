// centralized error object that derives from Node’s Error
function AppError(httpCode, description, isOperational) {
  Error.call(this);
  Error.captureStackTrace(this);
  this.httpCode = httpCode;
  this.description = description;
  this.isOperational = isOperational;
}

AppError.prototype = Object.create(Error.prototype);
AppError.prototype.constructor = AppError;

module.exports.AppError = AppError;
