import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Dashboard from "@/components/page/Dashboard";
import { getTasks } from "@/lib/get-tasks-service/getTasksService";

type TasksPageProps = {
  params?: { q?: string };
};

export default async function TasksPage({ params }: TasksPageProps) {
  const q = (await params?.q) ?? "";
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tasks", q],
    queryFn: async () => {
      const resp = await getTasks({ q });
      return resp;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Dashboard />
    </HydrationBoundary>
  );
}
