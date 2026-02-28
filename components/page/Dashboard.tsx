"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Task } from "@/lib/zodSchemas";
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

const columns = [
  {
    key: "backlog",
    title: "Backlog",
    color: "var(--bs-primary)",
  },
  {
    key: "in-progress",
    title: "In Progress",
    color: "var(--bs-warning)",
  },
  {
    key: "review",
    title: "Review",
    color: "var(--bs-purple)",
  },
  {
    key: "done",
    title: "Done",
    color: "var(--bs-success)",
  },
] as const;

type ColumnConfig = (typeof columns)[number];

const Dashboard = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const { data, isPending } = useQuery({
    queryKey: ["tasks", q],
    queryFn: async () => {
      const resp = await fetch(`/api/tasks/gettasks?q=${q}`);
      return resp.json();
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
  const rawTasks = (data?.tasks as Task[]) ?? [];
  const currentTasks = rawTasks.map((task) => ({
    ...task,
    id: String((task as Task & { id?: string | number })?.id),
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
      <div ref={setNodeRef} style={style} className="col-12 col-md-6 col-xl-3">
        <div
          className="h-100 border border-1 rounded-3 p-3 d-flex flex-column gap-3"
          style={{
            borderColor: column.color,
            backgroundColor: "var(--bs-column-bg)",
          }}
        >
          <div
            className="d-flex align-items-center justify-content-between"
            style={{ cursor: "grab" }}
            {...attributes}
            {...listeners}
          >
            <span className="d-flex align-items-center gap-2 text-uppercase small fw-semibold text-body">
              <span
                className="rounded-circle d-inline-block"
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: column.color,
                }}
              />
              {column.title}
            </span>
            <span className="badge rounded-pill text-bg-light text-body-secondary">
              {getColumnCount(column.key)}
            </span>
          </div>
          <TasksList column={column.key} tasks={currentTasks} />
          <Link
            href="/tasks/create-task"
            className="btn btn-outline-primary btn-sm w-100"
          >
            + Add task
          </Link>
        </div>
      </div>
    );
  };

  const StaticColumnCard = ({ column }: { column: ColumnConfig }) => {
    return (
      <div className="col-12 col-md-6 col-xl-3">
        <div
          className="h-100 border border-1 rounded-3 p-3 d-flex flex-column gap-3"
          style={{
            borderColor: column.color,
            backgroundColor: "var(--bs-column-bg)",
          }}
        >
          <div className="d-flex align-items-center justify-content-between">
            <span className="d-flex align-items-center gap-2 text-uppercase small fw-semibold text-body">
              <span
                className="rounded-circle d-inline-block"
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: column.color,
                }}
              />
              {column.title}
            </span>
            <span className="badge rounded-pill text-bg-light text-body-secondary">
              {getColumnCount(column.key)}
            </span>
          </div>
          <TasksList column={column.key} tasks={currentTasks} />
          <Link
            href="/tasks/create-task"
            className="btn btn-outline-primary btn-sm w-100"
          >
            + Add task
          </Link>
        </div>
      </div>
    );
  };

  const columnsGrid = (
    <div className="row g-3">
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
      <main className="container py-4">
        <div className="d-flex flex-column gap-3">{columnsGrid}</div>
      </main>
    );
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <main className="container py-4">
        <div className="d-flex flex-column gap-3">
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
