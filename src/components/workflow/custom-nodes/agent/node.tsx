import type { NodeProps } from "@xyflow/react";
import { MousePointer2Icon } from "lucide-react";
import WorkflowNode from "../../workflow-node";

export default function AgentNode(props: NodeProps) {
  const { data, id, selected } = props;
  const bgColor = data?.color as string;
  const label = (data?.label as string) || "Agent";
  return (
    <WorkflowNode
      nodeId={id}
      label={label}
      icon={MousePointer2Icon}
      subText="Agent"
      selected={selected}
      handles={{ target: true, source: true }}
      color={bgColor}
      settingTitle={`${label} Settings`}
      settingDescription="Call the model with instructions and tools"
      settingComponent={<></>}
    />
  );
}
