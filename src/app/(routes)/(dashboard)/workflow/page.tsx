import CreateWorkflowDialog from "@/components/workflow/create-workflow";
import EmptyWorkflow from "@/components/workflow/empty-workflow";
import { requireAuth } from "@/lib/require-auth";

export default async function Page() {
  await requireAuth();

  return (
    <div className="min-h-auto">
      <div className="py-4">
        <div className="flex-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Workflows</h1>
            <p className="text-muted-foreground mt-1">
              Build a chaat agent workflow with custom logic and tools
            </p>
          </div>
          <CreateWorkflowDialog />
        </div>
        <EmptyWorkflow />
      </div>
    </div>
  );
}
