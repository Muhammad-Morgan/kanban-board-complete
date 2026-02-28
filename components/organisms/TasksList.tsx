import { startTransition, useEffect, useRef, useState } from "react";
import type { Task } from "@/lib/zodSchemas";
import TaskCard from "@/components/molecule/TaskCard";
import { type Column } from "@/lib/zodSchemas";

const ITEMS_PER_BATCH = 5;

const TasksList = ({ column, tasks }: { column: Column; tasks: Task[] }) => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_BATCH);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const filteredTasks = tasks.filter(
    (task) => (task.column ?? "backlog") === column,
  );
  const visibleTasks = filteredTasks.slice(0, visibleCount);
  const hasMore = visibleTasks.length < filteredTasks.length;

  useEffect(() => {
    startTransition(() => setVisibleCount(ITEMS_PER_BATCH));
  }, [column, filteredTasks.length]);

  useEffect(() => {
    if (!hasMore) return;
    const root = containerRef.current;
    const target = loadMoreRef.current;
    if (!root || !target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((count) =>
            Math.min(count + ITEMS_PER_BATCH, filteredTasks.length),
          );
        }
      },
      { root, rootMargin: "120px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, filteredTasks.length]);

  if (filteredTasks.length === 0) {
    return <div className="small text-body-secondary">No tasks yet.</div>;
  }

  return (
    <div
      ref={containerRef}
      className="d-flex flex-column gap-2 overflow-auto"
      style={{ maxHeight: "520px" }}
    >
      {visibleTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
      {hasMore ? (
        <div
          ref={loadMoreRef}
          className="py-2 text-center small text-body-secondary"
        >
          Loading more...
        </div>
      ) : null}
    </div>
  );
};

export default TasksList;
