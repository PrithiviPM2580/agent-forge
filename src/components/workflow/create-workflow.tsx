"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateWorkflow } from "@/hooks/workflow/use-workflow";
import { type WorkflowSchema, workflowSchema } from "@/schema/workflow";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";

export default function CreateWorkflowDialog() {
  const { mutate: createWorkflow, isPending } = useCreateWorkflow();

  const form = useForm<WorkflowSchema>({
    resolver: zodResolver(workflowSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function onSubmit(data: WorkflowSchema) {
    createWorkflow(data, {
      onSuccess: () => {
        form.reset();
        toast.add({
          type: "success",
          description: "Workflow created successfully",
        });
      },
      onError: (error) => {
        console.log(error);
        toast.add({
          type: "error",
          description: "Failed to create workflow",
          priority: "high",
        });
      },
    });
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button type="button">
            <PlusIcon size={18} />
            New Workflow
          </Button>
        }
      />

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Create New Workflow
            </DialogTitle>

            <DialogDescription>
              Enter a name for your new AI workflow
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="workflow-name">Workflow name</FieldLabel>

                  <Input
                    {...field}
                    id="workflow-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. Customer Support"
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="workflow-description">
                    Workflow description
                  </FieldLabel>

                  <Textarea
                    {...field}
                    id="workflow-description"
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. A workflow for handling customer support requests"
                    rows={5}
                    className="resize-none"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <DialogFooter>
            <DialogClose
              render={
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              }
            />

            <Button type="submit" disabled={isPending}>
              {isPending && <Spinner />}
              <span>Create</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
