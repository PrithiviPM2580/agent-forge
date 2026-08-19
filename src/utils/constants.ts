import {
  type LucideIcon,
  PencilIcon,
  PlayIcon,
  SettingsIcon,
  WorkflowIcon,
} from "lucide-react";

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
