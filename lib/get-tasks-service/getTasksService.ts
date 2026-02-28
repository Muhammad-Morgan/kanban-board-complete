"use server";
import dbConnect from "../dbConnect";
import { Task } from "@/models/Task/task";
import { StatusCodes } from "http-status-codes";
import { TaskType } from "@/models/Task/task";
import { auth } from "@/auth";
type GetTasksProps = {
  q?: string;
};

export async function getTasks({ q = "" }: GetTasksProps) {
  const session = await auth();

  if (!session?.user)
    return {
      message: "Unauthorized",
      statusCode: StatusCodes.UNAUTHORIZED,
    };
  const userId = session?.user?.id;

  await dbConnect();
  const filter = q
    ? {
        createdBy: userId,
        $or: [
          { title: { $regex: q, $options: "i" } },
          { description: { $regex: q, $options: "i" } },
        ],
      }
    : { createdBy: userId };

  const tasks = (await Task.find(filter)) as TaskType[];
  const safeTasks = tasks.map((task) => ({
    id: String(task._id ?? ""),
    _id: String(task._id ?? ""),
    title: String(task.title ?? ""),
    description: String(task.description ?? ""),
    column: task.column,
    createdBy: String(task.createdBy ?? ""),
  }));

  return {
    success: true,
    tasks: safeTasks,
    count: safeTasks.length,
    statusCode: StatusCodes.OK,
  };
}

export async function getSingleTask({ id }: { id: string }) {
  if (!id)
    return { message: "ID is missing", statusCode: StatusCodes.BAD_REQUEST };
  const session = await auth();
  if (!session?.user)
    return {
      message: "Unauthorized",
      statusCode: StatusCodes.UNAUTHORIZED,
    };
  const userId = session?.user?.id;
  await dbConnect();
  const task = (await Task.findOne({
    _id: id,
    createdBy: userId,
  })) as TaskType;
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
