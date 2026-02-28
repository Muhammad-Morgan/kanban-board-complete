import { notFound } from "next/navigation";
import { getSingleTask } from "@/lib/actions";
import EditTaskForm from "@/components/organisms/EditTaskForm";

type EditTaskPageProps = {
  params: { id: string };
};

export default async function EditTaskPage({ params }: EditTaskPageProps) {
  const { id } = await params;
  if (!id) throw new Error("ID missing...");
  const task = await getSingleTask(id);

  if (!task) {
    notFound();
  }

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
