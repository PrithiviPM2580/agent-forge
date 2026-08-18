import { type LucideIcon, SettingsIcon, WorkflowIcon } from "lucide-react";

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
