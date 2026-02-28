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
    <div
      className="d-flex justify-content-center"
      style={{ paddingBlock: "2.5rem" }}
    >
      <div className="card" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="card-body">
          <h5 className="card-title mb-4">Edit Task</h5>
          <EditTaskForm task={task} />
        </div>
      </div>
    </div>
  );
}
