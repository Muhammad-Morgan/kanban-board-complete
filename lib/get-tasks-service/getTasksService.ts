"use server";
import dbConnect from "../dbConnect";
import { Task } from "@/models/Task/task";
import { StatusCodes } from "http-status-codes";
import { TaskType } from "@/models/Task/task";
type GetTasksProps = {
  q?: string;
};

export async function getTasks({ q = "" }: GetTasksProps) {
  const filter = q
    ? {
        $or: [
          { title: { $regex: q, $options: "i" } },
          { description: { $regex: q, $options: "i" } },
        ],
      }
    : {};

  const tasks = (await Task.find(filter)) as TaskType[];

  return {
    success: true,
    tasks,
    count: tasks.length,
    statusCode: StatusCodes.OK,
  };
}

export async function getSingleTask({ id }: { id: string }) {
  if (!id)
    return { message: "ID is missing", statusCode: StatusCodes.BAD_REQUEST };
  await dbConnect();
  const task = (await Task.findOne({ _id: id })) as TaskType;
  if (!task)
    return {
      message: `No task with id: ${id} was found`,
      statusCode: StatusCodes.NOT_FOUND,
    };
  return {
    task: {
      id: String(task._id ?? ""),
      title: String(task.title ?? ""),
      description: String(task.description ?? ""),
      column: task.column,
    },
    success: true,
    statusCode: StatusCodes.OK,
  };
}
