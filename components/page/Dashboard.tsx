"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TasksList from "@/components/organisms/TasksList";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  DndContext,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { getTasks } from "@/lib/get-tasks-service/getTasksService";
import { TaskType } from "@/models/Task/task";
const columns = [
  {
    key: "backlog",
    title: "Backlog",
    color: "var(--chart-1)",
  },
  {
    key: "in-progress",
    title: "In Progress",
    color: "var(--chart-4)",
  },
  {
    key: "review",
    title: "Review",
    color: "var(--chart-3)",
  },
  {
    key: "done",
    title: "Done",
    color: "var(--chart-2)",
  },
] as const;

type ColumnConfig = (typeof columns)[number];

const Dashboard = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const { data } = useQuery({
    queryKey: ["tasks", q],
    queryFn: async () => {
      const resp = getTasks({ q });
      return resp;
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
  );

  const [columnOrder, setColumnOrder] = useState<string[]>(
    columns.map((column) => column.key),
  );
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const orderedColumns = useMemo(
    () =>
      columnOrder
        .map((key) => columns.find((column) => column.key === key))
        .filter(Boolean) as ColumnConfig[],
    [columnOrder],
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id === over.id) return;

    setColumnOrder((items) => {
      const oldIndex = items.indexOf(String(active.id));
      const newIndex = items.indexOf(String(over.id));
      if (oldIndex === -1 || newIndex === -1) return items;
      return arrayMove(items, oldIndex, newIndex);
    });
  };
  const rawTasks = (data?.tasks as unknown as TaskType[]) ?? [];
  const currentTasks = rawTasks.map((task) => ({
    ...task,
    id: String((task as TaskType & { id?: string | number })?.id),
    column: task.column,
  }));
  const getColumnCount = (columnKey: string) => {
    return currentTasks.filter(
      (task) => (task.column ?? "backlog") === columnKey,
    ).length;
  };

  const ColumnCard = ({ column }: { column: ColumnConfig }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: column.key });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.85 : 1,
    };

    return (
      <div ref={setNodeRef} style={style} className="w-full">
        <div className="flex h-full flex-col gap-3 rounded-2xl border bg-muted p-4 shadow-sm transition hover:shadow-md">
          <div
            className="flex cursor-grab items-center justify-between gap-2 active:cursor-grabbing"
            {...attributes}
            {...listeners}
          >
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: column.color }}
              />
              {column.title}
            </span>
            <span className="inline-flex items-center rounded-full border border-border/70 bg-background/70 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
              {getColumnCount(column.key)}
            </span>
          </div>
          <TasksList column={column.key} tasks={currentTasks} />
          <Link
            href={`/tasks/create-task?column=${column.key}`}
            className="inline-flex items-center justify-center rounded-lg border border-border/70 bg-background/60 px-3 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
          >
            + Add task
          </Link>
        </div>
      </div>
    );
  };

  const StaticColumnCard = ({ column }: { column: ColumnConfig }) => {
    return (
      <div className="w-full">
        <div
          className="flex h-full flex-col gap-3 rounded-2xl border bg-card/80 p-4 shadow-sm"
          style={{ borderColor: column.color }}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: column.color }}
              />
              {column.title}
            </span>
            <span className="inline-flex items-center rounded-full border border-border/70 bg-background/70 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
              {getColumnCount(column.key)}
            </span>
          </div>
          <TasksList column={column.key} tasks={currentTasks} />
          <Link
            href={`/tasks/create-task?column=${column.key}`}
            className="inline-flex items-center justify-center rounded-lg border border-border/70 bg-background/60 px-3 py-2 text-sm font-medium text-foreground transition hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
          >
            + Add task
          </Link>
        </div>
      </div>
    );
  };

  const columnsGrid = (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {orderedColumns.map((column) =>
        isClient ? (
          <ColumnCard key={column.key} column={column} />
        ) : (
          <StaticColumnCard key={column.key} column={column} />
        ),
      )}
    </div>
  );

  if (!isClient) {
    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-6">
        <div className="flex flex-col gap-4">{columnsGrid}</div>
      </main>
    );
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <main className="mx-auto w-full max-w-6xl px-6 py-6">
        <div className="flex flex-col gap-4">
          <SortableContext
            items={columnOrder}
            strategy={horizontalListSortingStrategy}
          >
            {columnsGrid}
          </SortableContext>
        </div>
      </main>
    </DndContext>
  );
};

export default Dashboard;
