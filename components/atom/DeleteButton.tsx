"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./button";

type DeleteButtonProps = {
  taskId: string;
};

const DeleteButton = ({ taskId }: DeleteButtonProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["tasks", "delete", taskId],
    mutationFn: async () => {
      const resp = await fetch("/api/tasks/deletetask", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: taskId }),
      });

      if (!resp.ok) {
        throw new Error("Failed to delete task");
      }

      return resp.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
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
