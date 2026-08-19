"use client";

import { ChevronLeftIcon, MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useWorkflowContext } from "@/context/workflow-context";
import { cn } from "@/lib/utils";
import type { ViewType } from "@/utils/constants";
import { tabs } from "@/utils/constants";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";

interface WorkflowHeaderProps {
  isLoading: boolean;
  name?: string;
  workflowId?: string;
}

export default function WorkflowHeader({
  name,
  workflowId,
  isLoading,
}: WorkflowHeaderProps) {
  const { view, setView } = useWorkflowContext();

  const zIndex = view === "preview" ? "z-100" : " ";

  function handleViewChange(view: ViewType) {
    setView(view);
  }
  return (
    <div className="relative">
      <header className=" w-full absolute top-0 z-50 bg-transparent">
        <div className="h-14 flex-between px-4">
          <Link
            href="/workflow"
            className={`flex items-center gap-3 bg-card py-1 px-1 rounded-lg ${zIndex}`}
          >
            <Button variant="secondary" size="icon" className="size-8!">
              <ChevronLeftIcon className="size-4" />
            </Button>
            {isLoading ? (
              <Skeleton className="w-20" />
            ) : (
              <h1>{name || "Untitled Workflow"}</h1>
            )}
          </Link>
          <div className="flex items-center gap-1 rounded-lg bg-muted p-1 mt-1 z-100">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                onClick={() => handleViewChange(tab.id)}
                className={cn(
                  "flex flex-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  view === tab.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-white",
                )}
              >
                <tab.icon className="size-3.5" />
                <span>{tab.label}</span>
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2 bg-card rounded-lg">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreHorizontalIcon className="size-4" />
                  </Button>
                }
              />
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" className="h-8 gap-1.5">
              <MoreHorizontalIcon className="size-3.5" />
              <span>Code</span>
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
}
