class APIResponse {
  constructor(statusCode, message = "Success", data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400;
  }

  static success(message, data) {
    return new APISuccessResponse(200, message, data);
  }

  static error(message, data) {
    return new APIErrorResponse(500, message, data);
  }
}
export { APIResponse };