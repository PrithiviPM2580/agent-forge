import { z } from "zod";

export const workflowSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

export type WorkflowSchema = z.infer<typeof workflowSchema>;
