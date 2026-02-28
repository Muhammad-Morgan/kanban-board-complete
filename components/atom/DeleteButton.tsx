"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./button";
import { deleteTask } from "@/lib/delete-task-service/deleteTaskService";
import { toast } from "sonner";
import { Spinner } from "./spinner";
import { Trash2 } from "lucide-react";

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
      toast.success(`Task ID ${taskId.slice(-5)} was deleted...`);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["delete"] });
      queryClient.invalidateQueries({ queryKey: [taskId] });
    },
  });

  return (
    <Button
      variant="destructive"
      size="icon-sm"
      type="button"
      onClick={() => mutate()}
      disabled={isPending}
    >
      {isPending ? <Spinner className="animate-spin" /> : <Trash2 />}
    </Button>
  );
};

export default DeleteButton;
