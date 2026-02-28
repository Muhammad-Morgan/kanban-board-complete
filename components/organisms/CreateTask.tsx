"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { taskSchema, type TaskSchemaType } from "@/lib/zodSchemas";
import { SubmitButton } from "../atom/SubmitButton";
import { createTask } from "@/lib/create-task-service/createTaskService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateTask = ({
  column: columnDefault,
}: {
  column?: "backlog" | "in-progress" | "review" | "done";
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();

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
      column: columnDefault || "backlog",
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
      router.push("/tasks");
    },
  });
  const onSubmit = (data: TaskSchemaType) => {
    // here we invoke the mutate
    mutate(data);
  };

  return (
    <div className="flex justify-center px-6 py-10">
      <div className="w-full max-w-125 rounded-2xl border border-border/70 bg-card/80 p-6 shadow-sm">
        <div>
          <h5 className="mb-4 text-lg font-semibold text-foreground">
            Create New Task
          </h5>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Title
              </label>
              <input
                id="title"
                className={`w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 ${errors.title ? "border-destructive/70 focus-visible:ring-destructive/40" : "border-input"}`}
                placeholder="e.g. Design homepage"
                {...register("title")}
              />
              {errors.title ? (
                <div className="mt-2 text-xs text-destructive">
                  {errors.title.message}
                </div>
              ) : null}
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
                className={`min-h-30 w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 ${errors.description ? "border-destructive/70 focus-visible:ring-destructive/40" : "border-input"}`}
                placeholder="Write details..."
                rows={5}
                {...register("description")}
              />
              {errors.description ? (
                <div className="mt-2 text-xs text-destructive">
                  {errors.description.message}
                </div>
              ) : null}
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
                className={`h-10 w-full rounded-lg border bg-background px-3 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 ${errors.column ? "border-destructive/70 focus-visible:ring-destructive/40" : "border-input"}`}
                {...register("column")}
              >
                <option value="backlog">Backlog</option>
                <option value="in-progress">In Progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
              </select>
              {errors.column ? (
                <div className="mt-2 text-xs text-destructive">
                  {errors.column.message}
                </div>
              ) : null}
            </div>

            <div className="w-fit">
              <SubmitButton isLoading={isPending}>Create Task</SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
