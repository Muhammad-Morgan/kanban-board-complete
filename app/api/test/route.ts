import { createTask } from "@/lib/create-task-service/createTaskService";
import { editTask } from "@/lib/edit-task-service/editTaskService";
import { BadRequestError, NotFoundError } from "@/lib/errors";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { title, description, column, id } = await req.json();
  const toBeEditTask = {
    id,
    title,
    description,
    column,
  };
  const resp = await editTask(toBeEditTask);
  if (!resp.success) return NextResponse.json({ msg: resp.message });
  return NextResponse.json({ sucess: resp.success, task: resp.task });
};
