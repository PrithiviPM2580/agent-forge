import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import type { Workflow } from "@/generated/prisma/client";
import { api } from "@/lib/axios";

interface CreateWorkflowPayload {
  name: string;
  description?: string;
}

export function useWorkflows() {
  return useQuery({
    queryKey: ["workflows"],

    queryFn: async () => {
      return await api
        .get<{ data: Workflow[] }>("/api/workflow")
        .then((res) => res.data.data);
    },
  });
}

export function useCreateWorkflow() {
  //   const router = useRouter();

  return useMutation({
    mutationFn: async ({ name, description }: CreateWorkflowPayload) => {
      return await api
        .post("/api/workflow", { name, description })
        .then((res) => res.data);
    },
    onSuccess: (data) => {
      toast.add({
        type: "success",
        description: "Workflow created successfully",
      });
      //   router.push(`/workflow/${data.data.id}`);
    },
    onError: (error) => {
      console.error(error);
      toast.add({
        type: "error",
        description: "Failed to create workflow",
        priority: "high",
      });
    },
  });
}

export function useWorkflowByid(workflowId: string) {
  return useQuery({
    queryKey: ["workflow", workflowId],
    queryFn: async () => {
      return await api
        .get<{ data: Workflow }>(`/api/workflow/${workflowId}`)
        .then((res) => res.data.data);
    },
    enabled: !!workflowId,
  });
}
