import { format } from "date-fns";
import { WorkflowIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Workflow } from "@/generated/prisma/client";
import { useRouter } from "next/navigation";

export default function WorkflowCard({ workflow }: { workflow: Workflow }) {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/workflow/${workflow.id}`)}
      className="cursor-pointer"
    >
      <CardHeader>
        <div className="bg-primary/20 p-2 rounded-full w-fit">
          <WorkflowIcon className="text-primary/60 size-4" />
        </div>
        <CardTitle className="font-semibold">{workflow.name}</CardTitle>
        <CardDescription>{workflow.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {format(workflow.createdAt, "MM/dd/yyyy")}
        </p>
      </CardContent>
    </Card>
  );
}
