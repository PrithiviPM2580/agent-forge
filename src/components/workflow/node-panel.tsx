import { Panel } from "@xyflow/react";
import { cn } from "@/lib/utils";
import { getNodeConfig } from "@/lib/workflow/node-config";
import { NODE_LIST } from "@/utils/constants";
import { Button } from "../ui/button";

export default function NodePanel() {
  function onDragStart(event: React.DragEvent, nodeType: string) {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  }
  return (
    <Panel
      position="top-left"
      className="w-60 top-10! h-fit bg-card shadow-xl pb-5 rounded-lg flex flex-col"
    >
      <div className="flex-1 p-4 space-y-2">
        {NODE_LIST.map((group) => (
          <div className="space-y-1" key={group.group}>
            <h4 className="text-[11px] font-medium text-muted-foreground px-1">
              {group.group}
            </h4>
            <div className="space-y-1">
              {group.items.map((nodeType) => {
                const config = getNodeConfig(nodeType);
                if (!config) return null;
                const Icon = config.icon;

                return (
                  <Button
                    variant="ghost"
                    key={nodeType}
                    onDragStart={(e) => onDragStart(e, nodeType)}
                    draggable
                    disabled={false}
                    className={cn(
                      "flex w-full items-center justify-start gap-3 p-1 hover:bg-accent/20 transition-all cursor-grab active:cursor-grabbing disabled:opacity-50 disabled:pointer-events-none",
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-sm size-7 flex-center",
                        config?.color,
                      )}
                    >
                      <Icon className="size-3.5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {config?.label ?? nodeType}
                    </span>
                  </Button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
