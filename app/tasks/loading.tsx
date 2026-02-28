export default function TasksLoading() {
  return (
    <main className="container py-5 d-flex align-items-center justify-content-center">
      <div className="text-center">
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-body-secondary mb-0">Loading tasks...</p>
      </div>
    </main>
  );
}
