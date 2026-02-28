import Link from "next/link";
import type { Task } from "@/lib/zodSchemas";
import DeleteButton from "@/components/atom/DeleteButton";
import { Button } from "../atom/button";

const TaskCard = ({ task }: { task: Task }) => {
  return (
    <div className="rounded-xl border border-border/70 bg-card/80 p-3 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="pr-2 wrap-break-word">
          <h6 className="text-sm font-semibold text-foreground">
            {task.title}
          </h6>
          <p className="mt-1 text-xs text-muted-foreground wrap-break-word">
            {task.description}
          </p>
        </div>
        <Button asChild variant="link" size="icon-sm">
          <Link
            className="text-xs font-medium text-primary"
            href={`/tasks/edit-task/${task.id}`}
          >
            Edit
          </Link>
        </Button>
      </div>
      <div className="flex justify-end">
        <DeleteButton taskId={task.id} />
      </div>
    </div>
  );
};

export default TaskCard;
