class APIError extends Error {
  constructor(statusCode, message = "Something went wrong", error = [], stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.error = error;
    this.success = false;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}