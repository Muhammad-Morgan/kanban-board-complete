"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { taskSchema, type TaskSchemaType } from "@/lib/zodSchemas";
import { SubmitButton } from "../atom/SubmitButton";
import { createTask } from "@/lib/create-task-service/createTaskService";
import { toast } from "sonner";

const CreateTask = () => {
  const queryClient = useQueryClient();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskSchemaType>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      column: "backlog",
    },
  });
  const { mutate, isPending } = useMutation({
    mutationKey: ["tasks"],
    mutationFn: async (data: TaskSchemaType) => {
      const resp = await createTask({
        title: data.title,
        description: data.description,
        column: data.column,
      });
      if (!resp.success) {
        toast.error(resp.message || "Task wasn't created...");
      }
      return resp;
    },
    onSuccess: () => {
      toast.success("Task was created...");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      reset();
    },
  });
  const onSubmit = (data: TaskSchemaType) => {
    // here we invoke the mutate
    mutate(data);
  };

  return (
    <div
      className="d-flex justify-content-center"
      style={{ paddingBlock: "2.5rem" }}
    >
      <div className="card" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="card-body">
          <h5 className="card-title mb-4">Create New Task</h5>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="d-flex flex-column gap-4"
          >
            <div>
              <label htmlFor="title" className="form-label fw-semibold mb-2">
                Title
              </label>
              <input
                id="title"
                className={`form-control form-control-lg ${errors.title ? "is-invalid" : ""}`}
                placeholder="e.g. Design homepage"
                {...register("title")}
              />
              {errors.title ? (
                <div className="invalid-feedback d-block mt-2">
                  {errors.title.message}
                </div>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="description"
                className="form-label fw-semibold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                className={`form-control ${errors.description ? "is-invalid" : ""}`}
                placeholder="Write details..."
                rows={5}
                {...register("description")}
              />
              {errors.description ? (
                <div className="invalid-feedback d-block mt-2">
                  {errors.description.message}
                </div>
              ) : null}
              <div className="form-text mt-2">Optional, but recommended.</div>
            </div>

            <div>
              <label htmlFor="column" className="form-label fw-semibold">
                Column
              </label>
              <select
                id="column"
                className={`form-select ${errors.column ? "is-invalid" : ""}`}
                {...register("column")}
              >
                <option value="backlog">Backlog</option>
                <option value="in-progress">In Progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
              </select>
              {errors.column ? (
                <div className="invalid-feedback">{errors.column.message}</div>
              ) : null}
            </div>

            <div style={{ width: "fit-content" }}>
              <SubmitButton isLoading={isPending}>Create Task</SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
