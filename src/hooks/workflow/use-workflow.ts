import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { api } from "@/lib/axios";

interface CreateWorkflowPayload {
  name: string;
  description?: string;
}

export function useCreateWorkflow() {
  //   const router = useRouter();

  return useMutation({
    mutationFn: async ({ name, description }: CreateWorkflowPayload) => {
      return api
        .post("/workflow", { name, description })
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
