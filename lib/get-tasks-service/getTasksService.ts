"use server";
type GetTasksProps = {
  q?: string;
};
export async function getTasks({ q = "" }: GetTasksProps) {}

export async function getSingleTask({ id }: { id: string }) {}
