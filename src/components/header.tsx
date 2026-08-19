"use client";

import { LogOutIcon, MoonIcon, SunIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export default function Header() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { data: user, isPending } = authClient.useSession();

  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin");
          toast.add({
            type: "success",
            description: "Logged out successfully",
          });
        },
      },
    });
  }

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
          <DropdownMenu>
            <DropdownMenuTrigger
              className="rounded-full outline-none"
              disabled={isPending}
            >
              <Avatar>
                <AvatarImage src={user?.user.image ?? "U"} alt="User" />
                <AvatarFallback>
                  {user?.user.name?.charAt(0).toUpperCase() ?? <UserIcon />}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="rounded-sm! w-40">
              <DropdownMenuItem
                className="rounded-sm! cursor-pointer"
                onClick={handleLogout}
              >
                <LogOutIcon className="size-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
