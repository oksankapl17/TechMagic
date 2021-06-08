'use strict';

class ApplicationError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.error = message;
    this._code = 500;
  }

  set code(code) {
    this._code = code;
  }

  get code() {
    return this._code;
  }

  toJSON() {
    return JSON.stringify({
      message: this.message,
      error: this.error,
      code: this.code
    });
  }
}

module.exports.serverError = (err) => {
  const error = new ApplicationError('SERVER_ERROR');
  if (err) {
    error.message = err;
  }
  error.code = 500;
  return error.toJSON();
};

module.exports.notFound = (err) => {
  const error = new ApplicationError('NOT_FOUND');
  if (err) {
    error.message = err;
  }
  error.code = 404;
  return error.toJSON();
};

module.exports.badRequest = (err) => {
  const error = new ApplicationError('BAD_REQUEST');
  if (err) {
    error.message = err;
  }
  error.code = 400;
  return error.toJSON();
};

module.exports.forbidden = (err) => {
  const error = new ApplicationError('FORBIDDEN');
  if (err) {
    error.message = err;
  }
  error.code = 403;
  return error.toJSON();
};

module.exports.invalidJoi = (err) => {
  let result = '';
  for (const error of err.details) {
    result += error.message + '; ';
  }
  return this.badRequest(result);
};
