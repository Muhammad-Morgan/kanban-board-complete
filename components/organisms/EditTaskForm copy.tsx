"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task } from "@/lib/zodSchemas";

type TaskWithId = Task & { id: string | number };

type EditTaskFormProps = {
  task: TaskWithId;
};

const EditTaskForm = ({ task }: EditTaskFormProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["tasks", "edit", task.id],
    mutationFn: async (payload: {
      id: string | number;
      title: string;
      description: string;
      column: string;
    }) => {
      const resp = await fetch("/api/tasks/edittask", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) {
        throw new Error("Failed to update task");
      }
      return resp.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    mutate({
      id: task.id,
      title: String(formData.get("title") ?? ""),
      description: String(formData.get("description") ?? ""),
      column: String(formData.get("column") ?? "backlog"),
    });
  };

  return (
    <form className="d-flex flex-column gap-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title" className="form-label fw-semibold mb-2">
          Title
        </label>
        <input
          id="title"
          name="title"
          className="form-control form-control-lg"
          placeholder="e.g. Design homepage"
          defaultValue={task.title}
        />
      </div>

      <div>
        <label htmlFor="description" className="form-label fw-semibold mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="form-control"
          placeholder="Write details..."
          rows={5}
          defaultValue={task.description}
        />
        <div className="form-text mt-2">Optional, but recommended.</div>
      </div>

      <div>
        <label htmlFor="column" className="form-label fw-semibold">
          Column
        </label>
        <select
          id="column"
          name="column"
          className="form-select"
          defaultValue={task.column}
        >
          <option value="backlog">Backlog</option>
          <option value="in-progress">In Progress</option>
          <option value="review">Review</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div className="d-flex flex-column flex-sm-row gap-2 justify-content-end">
        <button type="button" className="btn btn-outline-secondary">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default EditTaskForm;
