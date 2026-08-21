import type { NodeProps } from "@xyflow/react";
import { PlayIcon } from "lucide-react";
import WorkflowNode from "../../workflow-node";

export default function StartNode(props: NodeProps) {
  const { data, id, selected } = props;
  const bgColor = data?.color as string;
  return (
    <WorkflowNode
      nodeId={id}
      label="Start"
      icon={PlayIcon}
      subText="Trigger"
      classname="min-w-28"
      isDeletable={false}
      selected={selected}
      handles={{ target: false, source: true }}
      color={bgColor}
      settingTitle="Start Node Settings"
      settingDescription="The workflow starting point"
      settingComponent={<></>}
    />
  );
}
