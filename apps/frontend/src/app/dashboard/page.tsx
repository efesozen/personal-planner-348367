'use client';

import { useTasks } from '@/features/tasks/hooks/use-tasks';

export default function DashboardPage() {
  const { data: tasks, isLoading } = useTasks();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="text-muted-foreground mb-6">Main user dashboard providing an overview of tasks and calendar.</p>
      
      <div className="grid gap-4">
        {tasks?.map((task: any) => (
          <div key={task.id} className="border rounded p-4">
            <pre>{JSON.stringify(task, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
