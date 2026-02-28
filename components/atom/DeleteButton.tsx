"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./button";
import { deleteTask } from "@/lib/delete-task-service/deleteTaskService";
import { toast } from "sonner";

type DeleteButtonProps = {
  taskId: string;
};

const DeleteButton = ({ taskId }: DeleteButtonProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["tasks", "delete", taskId],
    mutationFn: async () => {
      const resp = await deleteTask({ id: taskId });

      if (!resp.success) {
        toast.error(
          resp.message || `Deleting task ID ${taskId} was unsuccessful...`,
        );
        return;
      }

      return resp;
    },
    onSuccess: () => {
      toast.success(`Task ID ${taskId} was deleted...`);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["delete"] });
      queryClient.invalidateQueries({ queryKey: [taskId] });
    },
  });

  return (
    <Button
      variant="destructive"
      size="sm"
      type="button"
      onClick={() => mutate()}
      disabled={isPending}
    >
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeleteButton;
