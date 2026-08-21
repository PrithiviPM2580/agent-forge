"use client";

import { Position, useReactFlow } from "@xyflow/react";
import { type LucideIcon, SettingsIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { BaseHandle } from "../react-flow/base-handle";
import {
  BaseNode,
  BaseNodeContent,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
} from "../react-flow/base-node";
import { NodeStatusIndicator } from "../react-flow/node-status-indicator";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { toast } from "../ui/toast";

interface WorkflowNodeProps {
  nodeId: string;
  label: string;
  subText: string;
  icon: LucideIcon;
  handles: { target: boolean; source: boolean };
  isDeletable?: boolean;
  selected?: boolean;
  color?: string;
  status?: "initial" | "loading" | "success" | "error";
  classname?: string;
  children?: React.ReactNode;
  settingComponent?: React.ReactNode;
  settingTitle?: string;
  settingDescription?: string;
}

export default function WorkflowNode({
  nodeId,
  label,
  subText,
  icon: Icon,
  handles,
  isDeletable = true,
  selected,
  color = "bg-gray-500",
  status = "initial",
  classname,
  children,
  settingComponent,
  settingTitle,
  settingDescription,
}: WorkflowNodeProps) {
  const [settingOpen, setSettingOpen] = useState<boolean>(false);
  const { deleteElements } = useReactFlow();

  function onDeleteNode() {
    if (!isDeletable) {
      toast.add({
        type: "error",
        description: "This node cannot be deleted.",
      });
      return;
    }

    deleteElements({
      nodes: [{ id: nodeId }],
    });
  }
  return (
    <>
      <div className="relative">
        <NodeStatusIndicator status={status} variant="border">
          <BaseNode
            className={cn("min-w-36 w-fit cursor-pointer", classname)}
            onDoubleClick={(e) => {
              e.stopPropagation();
              if (!settingComponent) return;
              setSettingOpen(true);
            }}
          >
            <BaseNodeHeader className="flex items-start px-2 pt-3 pb-3.5">
              <div className="flex items-center gap-2">
                <div className={cn("rounded-sm size-7 flex-center", color)}>
                  <Icon className="size-3.5 text-white" />
                </div>
                <div className="flex flex-col">
                  <BaseNodeHeaderTitle className="text-sm pr-2 font-medium">
                    {label}
                  </BaseNodeHeaderTitle>
                  {subText && (
                    <p className="text-xs text-muted-foreground -mt-0.5 truncate max-w-20">
                      {subText}
                    </p>
                  )}
                </div>
              </div>
              {selected && (
                <ButtonGroup className="flex items-center -mt-px">
                  {settingComponent && (
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="size-6  hover:bg-accent"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSettingOpen(true);
                      }}
                    >
                      <SettingsIcon className="size-4" />
                    </Button>
                  )}
                  {isDeletable && (
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="size-6 hover:bg-destructive/10 hover:text-destructive -ml-px"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteNode();
                      }}
                    >
                      <Trash2Icon className="size-4" />
                    </Button>
                  )}
                </ButtonGroup>
              )}
            </BaseNodeHeader>
            {children && <BaseNodeContent>{children}</BaseNodeContent>}
            {handles.target && (
              <BaseHandle
                id="target-1"
                type="target"
                className="size-2"
                position={Position.Left}
              />
            )}
            {handles.source && (
              <BaseHandle
                id="source-1"
                type="source"
                className="size-2"
                position={Position.Right}
              />
            )}
          </BaseNode>
        </NodeStatusIndicator>
      </div>

      {settingComponent && (
        <Dialog open={settingOpen} onOpenChange={setSettingOpen}>
          <DialogContent
            className="max-w-md px-0 pb-2"
            overlayClassName="bg-black/10 backdrop-blur-none"
          >
            <DialogHeader className="px-4">
              {settingDescription && (
                <DialogDescription>{settingDescription}</DialogDescription>
              )}
              <DialogTitle>{settingTitle || `${label} Settings`}</DialogTitle>
            </DialogHeader>
            <div className="px-4 space-y-4 h-full max-h-[65vh] overflow-y-auto">
              {settingComponent}
            </div>
            <DialogFooter className="px-4 border-t pt-2">
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => setSettingOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
