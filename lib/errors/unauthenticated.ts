import { CustomAPIError } from "./cutom-api";
import { StatusCodes } from "http-status-codes";

export class UnauthenticatedError extends CustomAPIError {
  statusCode: typeof StatusCodes.UNAUTHORIZED;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
