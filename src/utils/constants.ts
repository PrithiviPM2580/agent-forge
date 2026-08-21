import {
  type LucideIcon,
  PencilIcon,
  PlayIcon,
  SettingsIcon,
  WorkflowIcon,
} from "lucide-react";
import { type NodeType, NodeTypeEnum } from "@/lib/workflow/node-config";

interface SidebarNavItemProps {
  title: string;
  icon: LucideIcon;
  url: string;
}

export const sidebarNavItems: SidebarNavItemProps[] = [
  {
    title: "Workflows",
    icon: WorkflowIcon,
    url: "/workflow",
  },
  {
    title: "Settings",
    icon: SettingsIcon,
    url: "/settings",
  },
];

export type ViewType = "edit" | "preview";

interface TabItemProps {
  id: ViewType;
  label: string;
  icon: LucideIcon;
}

export const tabs: TabItemProps[] = [
  {
    id: "edit",
    label: "Edit",
    icon: PencilIcon,
  },
  {
    id: "preview",
    label: "Preview",
    icon: PlayIcon,
  },
];

export const TOOL_MODE_ENUM = {
  SELECT: "select",
  HAND: "hand",
} as const;

export type ToolModeType = (typeof TOOL_MODE_ENUM)[keyof typeof TOOL_MODE_ENUM];

export interface NodeListProps {
  group: string;
  items: NodeType[];
}

export const NODE_LIST = [
  {
    group: "Core",
    items: [NodeTypeEnum.AGENT, NodeTypeEnum.END, NodeTypeEnum.COMMENT],
  },
  {
    group: "Logic",
    items: [NodeTypeEnum.IF_ELSE],
  },
  {
    group: "Network",
    items: [NodeTypeEnum.HTTP],
  },
];
