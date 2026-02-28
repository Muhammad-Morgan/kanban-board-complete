"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task } from "@/lib/zodSchemas";
import { editTask } from "@/lib/edit-task-service/editTaskService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type TaskWithId = Task & { id: string | number };

type EditTaskFormProps = {
  task: TaskWithId;
};

const EditTaskForm = ({ task }: EditTaskFormProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ["tasks", "edit", task.id],
    mutationFn: async (payload: {
      id: string;
      title: string;
      description: string;
      column: "backlog" | "in-progress" | "review" | "done";
    }) => {
      const resp = await editTask(payload);
      if (!resp.success) {
        toast.error(resp.message);
        return;
      }
      return resp;
    },
    onSuccess: () => {
      toast.success(`Task ID ${task.id.slice(-6)} was modified`);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["edit"] });
      queryClient.invalidateQueries({ queryKey: [task.id] });
      router.push("/tasks");
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    mutate({
      id: task.id,
      title: String(formData.get("title") ?? ""),
      description: String(formData.get("description") ?? ""),
      column: String(formData.get("column") ?? "backlog") as
        | "backlog"
        | "in-progress"
        | "review"
        | "done",
    });
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-semibold text-foreground"
        >
          Title
        </label>
        <input
          id="title"
          name="title"
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          placeholder="e.g. Design homepage"
          defaultValue={task.title}
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-semibold text-foreground"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="min-h-30 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          placeholder="Write details..."
          rows={5}
          defaultValue={task.description}
        />
        <div className="mt-2 text-xs text-muted-foreground">
          Optional, but recommended.
        </div>
      </div>

      <div>
        <label
          htmlFor="column"
          className="mb-2 block text-sm font-semibold text-foreground"
        >
          Column
        </label>
        <select
          id="column"
          name="column"
          className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          defaultValue={task.column}
        >
          <option value="backlog">Backlog</option>
          <option value="in-progress">In Progress</option>
          <option value="review">Review</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-border/70 bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition hover:border-primary/40 hover:bg-primary/5"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default EditTaskForm;
