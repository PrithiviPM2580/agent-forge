import { WorkflowIcon } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function EmptyWorkflow() {
  return (
    <div className="bg-gray-100/50 shadow-2xs max-w-sm mx-auto mt-40 rounded-sm">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon" className="bg-primary/10">
            <WorkflowIcon />
          </EmptyMedia>
          <EmptyTitle>No Workflow Found</EmptyTitle>
          <EmptyDescription>
            You haven't created any workflows yet.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
