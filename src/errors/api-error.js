export class APIError extends Error {
  constructor(msg, statusCode) {
    super(msg);
    this.statusCode = statusCode;
  }
}

export const createApiError = (msg, statusCode) =>
  new APIError(msg, statusCode);
