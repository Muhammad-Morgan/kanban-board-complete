"use server";

import { StatusCodes } from "http-status-codes";
import dbConnect from "../dbConnect";
import { Task, TaskType } from "@/models/Task/task";
import { auth } from "@/auth";

type DeleteButtonProps = {
  id: string;
};
export async function deleteTask({ id }: DeleteButtonProps) {
  if (!id)
    return { message: "ID is missing", statusCode: StatusCodes.BAD_REQUEST };
  const session = await auth();
  if (!session?.user?.id)
    return {
      message: "Unauthorized action",
      statusCode: StatusCodes.UNAUTHORIZED,
    };
  const userId = session.user.id;
  await dbConnect();
  // now let's delete
  const taskGone = (await Task.findOneAndDelete({
    _id: id,
    createdBy: userId,
  })) as
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
