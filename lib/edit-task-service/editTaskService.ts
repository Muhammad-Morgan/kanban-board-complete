"use server";
type EditTaskProps = {
  id: string;
  title: string;
  description: string;
  column: string;
};
export const editTask = async (task: EditTaskProps) => {};
