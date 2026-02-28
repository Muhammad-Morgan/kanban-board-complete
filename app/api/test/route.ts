import { createTask } from "@/lib/create-task-service/createTaskService";
import { deleteTask } from "@/lib/delete-task-service/deleteTaskService";
import { editTask } from "@/lib/edit-task-service/editTaskService";
import { BadRequestError, NotFoundError } from "@/lib/errors";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { id } = await req.json();
  const resp = await deleteTask({ id });
  if (!resp.success) return NextResponse.json({ msg: resp.message });
  return NextResponse.json({ sucess: resp.success });
};
