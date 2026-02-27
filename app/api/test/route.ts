import { createTask } from "@/lib/create-task-service/createTaskService";
import { BadRequestError, NotFoundError } from "@/lib/errors";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { title, description, column } = await req.json();

  const resp = await createTask({ title, description, column });
  if (!resp.success) return NextResponse.json({ msg: resp.message });
  return NextResponse.json({ sucess: resp.success });
};
