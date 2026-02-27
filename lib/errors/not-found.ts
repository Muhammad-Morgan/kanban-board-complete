import { CustomAPIError } from "./cutom-api";
import { StatusCodes } from "http-status-codes";

export class NotFoundError extends CustomAPIError {
  statusCode: typeof StatusCodes.NOT_FOUND;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
