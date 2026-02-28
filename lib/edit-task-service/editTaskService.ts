"use server";
import { Task } from "@/models/Task/task";
import { taskSchema } from "@/lib/zodSchemas";
import dbConnect from "../dbConnect";
import { StatusCodes } from "http-status-codes";
import { auth } from "@/auth";

type EditTaskProps = {
  id: string;
  title: string;
  description: string;
  column: "backlog" | "in-progress" | "review" | "done";
};
export const editTask = async (task: EditTaskProps) => {
  if (!task.title || !task.description || !task.column)
    return {
      message: "Please fill all the fields...",
      statusCode: StatusCodes.BAD_REQUEST,
    };
  const validateFields = taskSchema.safeParse({
    title: task.title,
    description: task.description,
    column: task.column,
  });
  if (!validateFields.success)
    return {
      message: validateFields.error.issues.map((i) => i.message).join(", "),
      statusCode: StatusCodes.BAD_REQUEST,
    };
  // create the object in DB
  const session = await auth();
  if (!session?.user?.id)
    return {
      message: "Unauthorized action",
      statusCode: StatusCodes.UNAUTHORIZED,
    };
  const userId = session.user.id;
  await dbConnect();
  const updatedTask = await Task.findOneAndUpdate(
    { _id: task.id, createdBy: userId },
    validateFields.data,
    { runValidators: true, new: true },
  );
  const safeTask = updatedTask
    ? {
        id: String(updatedTask._id ?? ""),
        // _id: String(updatedTask._id ?? ""),
        title: String(updatedTask.title ?? ""),
        description: String(updatedTask.description ?? ""),
        column: updatedTask.column,
        createdBy: String(
          (updatedTask as { createdBy?: string }).createdBy ?? "",
        ),
      }
    : null;
  return {
    task: safeTask,
    success: true,
    statusCode: StatusCodes.OK,
  };
};
