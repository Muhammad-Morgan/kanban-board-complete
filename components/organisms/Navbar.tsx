"use client";

import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import SearchBar from "../atom/SearchBar";
import { ModeToggle } from "../molecule/ThemeToggle";
import { getTasks } from "@/lib/get-tasks-service/getTasksService";
import { Button } from "../atom/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Spinner } from "../atom/spinner";

const Navbar = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const resp = await getTasks({});
      if (!resp || !("success" in resp) || !resp.success) return { tasks: [] };
      return resp;
    },
  });

  const tasksCount = Array.isArray((data as { tasks?: unknown[] })?.tasks)
    ? (data as { tasks: unknown[] }).tasks.length
    : Array.isArray(data)
      ? data.length
      : 0;

  const delay = (ms: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms));

  const handleLogout = async () => {
    try {
      setIsPending(true);
      await delay(1000);
      const res = await signOut({ redirect: false, callbackUrl: "/login" });
      router.replace(res?.url ?? "/login");
    } finally {
      setIsPending(false);
    }
  };
  return (
    <nav className="border-b border-border/70 bg-muted backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <Link
            className="flex items-center gap-3 text-foreground no-underline"
            href="/"
          >
            <span
              className="grid size-9.5 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm"
              aria-hidden="true"
            >
              <LayoutGrid className="h-5 w-5" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold uppercase tracking-[0.25em] md:text-base">
                Kanban Board
              </span>
              <span className="text-xs text-muted-foreground md:text-sm">
                {tasksCount} tasks
              </span>
            </span>
          </Link>

          <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center md:ml-auto md:w-auto">
            <Suspense
              fallback={<div className="h-8 w-full max-w-full sm:max-w-60" />}
            >
              <SearchBar />
            </Suspense>
            <div className="flex items-center gap-2">
              <ModeToggle />
              {/* Logout button placeholder */}
              <Button onClick={handleLogout} disabled={isPending}>
                Logout {isPending && <Spinner className="animate-spin" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
