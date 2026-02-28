"use server";

import { StatusCodes } from "http-status-codes";
import dbConnect from "../dbConnect";
import { Task, TaskType } from "@/models/Task/task";

type DeleteButtonProps = {
  id: string;
};
export async function deleteTask({ id }: DeleteButtonProps) {
  if (!id)
    return { message: "ID is missing", statusCode: StatusCodes.BAD_REQUEST };
  await dbConnect();
  // now let's delete
  const taskGone = (await Task.findByIdAndDelete(id)) as
    | TaskType
    | null
    | undefined;
  if (!taskGone)
    return {
      message: `Couldn't find task with ID ${id}`,
      statusCode: StatusCodes.NOT_FOUND,
    };
  return {
    success: true,
  };
}
