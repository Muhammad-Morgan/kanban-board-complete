"use server";
import { Task } from "@/models/Task/task";
import { taskSchema } from "@/lib/zodSchemas";
import dbConnect from "../dbConnect";
import { StatusCodes } from "http-status-codes";
import { auth } from "@/auth";

type CreateTasksProp = {
  title: string;
  description: string;
  column: "backlog" | "in-progress" | "review" | "done";
};
export async function createTask({
  title,
  description,
  column,
}: CreateTasksProp) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      message: "Unauthorized action",
      statusCode: StatusCodes.UNAUTHORIZED,
    };
  }
  const userId = session?.user?.id;
  if (!title || !description || !column)
    return {
      message: "Please fill all the fields...",
      statusCode: StatusCodes.BAD_REQUEST,
    };
  const validateFields = taskSchema.safeParse({ title, description, column });
  if (!validateFields.success)
    return {
      message: validateFields.error.issues.map((i) => i.message).join(", "),
      statusCode: StatusCodes.BAD_REQUEST,
    };
  // create the object in DB
  await dbConnect();
  await Task.create({ ...validateFields.data, createdBy: userId });
  return {
    success: true,
    statusCode: StatusCodes.CREATED,
  };
}
