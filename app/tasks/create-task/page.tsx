import CreateTask from "@/components/organisms/CreateTask";
type TasksPageProps = {
  searchParams?: Promise<{
    column?: "backlog" | "in-progress" | "review" | "done";
  }>;
};
const CreateTaskPage = async ({ searchParams }: TasksPageProps) => {
  const resolvedSearchParams = (await searchParams) ?? {};
  const column = resolvedSearchParams.column;
  console.log(column);

  return (
    <div>
      <CreateTask column={column} />
    </div>
  );
};

export default CreateTaskPage;
