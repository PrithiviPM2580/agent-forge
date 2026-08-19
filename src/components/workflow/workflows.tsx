"use client";

import { useWorkflows } from "@/hooks/workflow/use-workflow";
import { Skeleton } from "../ui/skeleton";
import EmptyWorkflow from "./empty-workflow";
import WorkflowCard from "./workflow-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Workflows() {
  const { data: workflows, isPending } = useWorkflows();

  if (isPending) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="w-full max-w-xs">
            <CardHeader>
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!workflows || workflows.length === 0) {
    return <EmptyWorkflow />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {workflows.map((workflow) => (
        <WorkflowCard key={workflow.id} workflow={workflow} />
      ))}
    </div>
  );
}
