import { notFound } from "next/navigation";

import EditTaskForm from "@/components/organisms/EditTaskForm";
import { getSingleTask } from "@/lib/get-tasks-service/getTasksService";

type EditTaskPageProps = {
  params: { id: string };
};

export default async function EditTaskPage({ params }: EditTaskPageProps) {
  const { id } = await params;
  const resp = await getSingleTask({ id });
  if (!resp.success) {
    notFound();
  }
  const { task } = resp;
  return (
    <div className="flex justify-center px-6 py-10">
      <div className="w-full max-w-[500px] rounded-2xl border border-border/70 bg-card/80 p-6 shadow-sm">
        <div>
          <h5 className="mb-4 text-lg font-semibold text-foreground">
            Edit Task
          </h5>
          <EditTaskForm task={task} />
        </div>
      </div>
    </div>
  );
}
