// instead of multiple try...catch blocks in route handlers.
// apiWrapper is a function that accepts handler as a parameter.
// handler is a function that takes any number of arguments and returns a Promise.
// then apiWrapper returns a new, anonymous async function that calls your handler inside a try/catch block. So it doesn't return the handler itself.
import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
export const apiWrapper =
  (handler: (req: Request) => Promise<NextResponse<unknown>>) =>
  async (req: Request) => {
    try {
      return await handler(req);
    } catch (error: unknown) {
      // here I will execute the middleware logic from express:
      // 1. initialize safe defaults
      let statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR;
      let message: string = "Something went wrong...";
      // 2. Type guard: ensure 'error' is an object we can inspect
      if (!error && typeof error === "object") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const err = error as any; // cast to any internally for property access

        // Handle Custom Errors
        if (err.statusCode) statusCode = err.statusCode;
        if (err.message) message = err.message;

        // 3. MongoDB Duplicate key
        if (err.code === 11000 && err.keyValue) {
          message = `Duplicate value entered for ${Object.keys(err.keyValue).join(", ")} field. Choose another value.`;
          statusCode = StatusCodes.BAD_REQUEST;
        }

        // 4. Handle Mongoose Validation Errors.
        if (err.name === "ValidationError" && err.errors) {
          message = Object.values(err.errors)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((item: any) => item.message)
            .join(",");
          statusCode = StatusCodes.BAD_REQUEST;
        }

        // 5. Handle Mongoose Cast Error (Invalid ID Format)
        if (err.name === "CastError") {
          message = `No item found with id: ${err.value}`;
          statusCode = StatusCodes.NOT_FOUND;
        }
      } else if (typeof error === "string") {
        message = error;
      }
      console.error(`[API ERROR LOG]:`, error);
      return NextResponse.json({ message, statusCode }, { status: statusCode });
    }
  };
