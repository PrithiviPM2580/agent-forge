import {
  FileIcon,
  GitBranchIcon,
  GlobeIcon,
  MousePointer2Icon,
  PlayIcon,
  SquareIcon,
} from "lucide-react";
import { generateId } from "@/utils/generate-id";

export const NodeTypeEnum = {
  START: "start",
  AGENT: "agent",
  IF_ELSE: "if_else",
  END: "end",
  HTTP: "http",
  COMMENT: "comment",
} as const;

export type NodeType = (typeof NodeTypeEnum)[keyof typeof NodeTypeEnum];

type NodeConfigBase = {
  type: NodeType;
  label: string;
  icon: React.ElementType;
  color: string;

  //   inputs: Record<string, any>;
  //   outputs: string[];
};

export const NODE_CONFIG: Record<NodeType, NodeConfigBase> = {
  [NodeTypeEnum.START]: {
    type: NodeTypeEnum.START,
    label: "Start",
    icon: PlayIcon,
    color: "bg-emerald-500",
  },
  [NodeTypeEnum.AGENT]: {
    type: NodeTypeEnum.AGENT,
    label: "Agent",
    icon: MousePointer2Icon,
    color: "bg-blue-500",
  },
  [NodeTypeEnum.IF_ELSE]: {
    type: NodeTypeEnum.IF_ELSE,
    label: "If / Else",
    icon: GitBranchIcon,
    color: "bg-orange-400",
  },
  [NodeTypeEnum.END]: {
    type: NodeTypeEnum.END,
    label: "End",
    icon: SquareIcon,
    color: "bg-red-400",
  },
  [NodeTypeEnum.HTTP]: {
    type: NodeTypeEnum.HTTP,
    label: "HTTP",
    icon: GlobeIcon,
    color: "bg-blue-400",
  },
  [NodeTypeEnum.COMMENT]: {
    type: NodeTypeEnum.COMMENT,
    label: "Note",
    icon: FileIcon,
    color: "bg-gray-500",
  },
};

export function getNodeConfig(type: NodeType) {
  const nodeType = NODE_CONFIG?.[type];
  if (!nodeType) return null;
  return nodeType;
}

export type CreateNodeOptions = {
  type: NodeType;
  position?: { x: number; y: number };
};

export function createNode({
  type,
  position = { x: 400, y: 200 },
}: CreateNodeOptions) {
  const config = getNodeConfig(type);
  if (!config) throw new Error(`Invalid node type: ${type}`);
  const id = generateId(type);
  return {
    id,
    type,
    position,
    deletable: type !== NodeTypeEnum.START,
    data: {
      label: config.label,
      color: config.color,
    },
  };
}
