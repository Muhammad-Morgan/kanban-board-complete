import { BadRequestError, NotFoundError } from "@/lib/errors";
import {
  getSingleTask,
  getTasks,
} from "@/lib/get-tasks-service/getTasksService";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")!;
  const { tasks, count } = await getTasks({ q });
  if (tasks.length === 0)
    throw new NotFoundError("No Tasks are found in route handler...");
  return NextResponse.json({ msg: "test", tasks, count });
}
// export const POST = async () => {};
// export const POST = async ()=>{}
// export const POST = async ()=>{}
