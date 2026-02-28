"use server";
import { Task } from "@/models/Task/task";
import { taskSchema } from "@/lib/zodSchemas";
import dbConnect from "../dbConnect";
import { StatusCodes } from "http-status-codes";

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
  await dbConnect();
  const updatedTask = await Task.findByIdAndUpdate(
    task.id,
    validateFields.data,
    { runValidators: true, new: true },
  );
  return {
    task: updatedTask,
    success: true,
    statusCode: StatusCodes.OK,
  };
};
