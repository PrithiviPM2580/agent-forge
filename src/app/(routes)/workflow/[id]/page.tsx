"use client";

import { useParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import WorkflowHeader from "@/components/workflow/workflow-header";
import { WorkflowProvider } from "@/context/workflow-context";
import { useWorkflowByid } from "@/hooks/workflow/use-workflow";

export default function Page() {
  const params = useParams();
  const id = params?.id as string;

  const { data: workflow, isPending } = useWorkflowByid(id);

  if (!workflow && !isPending) {
    return <div>Workflow not found</div>;
  }
  return (
    <div className="min-h-screen bg-background">
      <WorkflowProvider>
        <div className="flex flex-col h-screen relative">
          <WorkflowHeader
            name={workflow?.name}
            workflowId={workflow?.id}
            isLoading={isPending}
          />
          <div className="flex relative overflow-hidden">
            {isPending ? (
              <div className="flex-center h-screen w-full">
                <Spinner className="size-12 text-primary" />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </WorkflowProvider>
    </div>
  );
}
