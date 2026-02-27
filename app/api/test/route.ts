import { BadRequestError, NotFoundError } from "@/lib/errors";
import { getSingleTask } from "@/lib/get-tasks-service/getTasksService";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) throw new BadRequestError("ID is missing in route handler...");
  const task = await getSingleTask({ id });
  if (!task) throw new NotFoundError("Task is not found in route handler...");
  return NextResponse.json({ msg: "test", task });
}
// export const POST = async () => {};
// export const POST = async ()=>{}
// export const POST = async ()=>{}
