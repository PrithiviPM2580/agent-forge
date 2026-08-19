import { Button } from "@/components/ui/button";
import EmptyWorkflow from "@/components/workflow/empty-workflow";
import { requireAuth } from "@/lib/require-auth";
import { PlusIcon } from "lucide-react";

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
          <Button>
            <PlusIcon size={18} />
            <span>New Workflow</span>
          </Button>
        </div>
        <EmptyWorkflow />
      </div>
    </div>
  );
}
