import { CustomAPIError } from "./cutom-api";
import { StatusCodes } from "http-status-codes";

export class BadRequestError extends CustomAPIError {
  statusCode: typeof StatusCodes.BAD_REQUEST;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
