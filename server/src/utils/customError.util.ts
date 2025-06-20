export class CustomError extends Error {
  statusCode: number;
  statusText: string;
  success: boolean;
  constructor(
    statusText: string,
    statusCode: number,
    success: boolean,
    message: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.statusText = statusText;
    this.success = success;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
