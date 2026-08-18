"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export default function Header() {
  const { theme, setTheme } = useTheme();

  const isDarkMode = theme === "dark";
  return (
    <div className="border-b border-border bg-background">
      <div className="w-full px-4 py-2 lg:px-0 flex-between max-w-6xl mx-auto">
        <div />
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="relative rounded-full size-6"
            onClick={() => setTheme(isDarkMode ? "light" : "dark")}
          >
            <SunIcon
              className={cn(
                "absolute size-5",
                isDarkMode ? "scale-0" : "scale-100",
              )}
            />
            <MoonIcon
              className={cn(
                "absolute size-5",
                isDarkMode ? "scale-100" : "scale-0",
              )}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
