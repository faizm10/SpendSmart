"use client";

import { useRouter } from "next/navigation";
import {
  Calendar,
  Home,
  Inbox,
  LogOut,
  Search,
  Settings,
  UserCircle,
  DollarSign,
} from "lucide-react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "../theme-toggle";
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Transactions",
    url: "/transactions",
    icon: DollarSign,
  },
];

function UserProfileSkeleton() {
  return (
    <div className="flex items-center gap-3 px-2">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  );
}

export function AppSidebar() {
  const router = useRouter(); // Use the hook at the top level
  const { setTheme } = useTheme();
  const { data: session, status } = useSession();
  const user = session?.user;
  const isLoading = status === "loading";

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "?";

  const userImage = user?.image || undefined;

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false }); // Prevent default redirect
    router.push("/");
  };

  const profileMenuItems = [
    
    {
      title: "View Profile",
      icon: UserCircle,
      action: () => handleNavigation("/profile"),
    },
    {
      title: "Settings",
      icon: Settings,
      action: () => handleNavigation("/settings"),
    },
    {
      title: "Logout",
      icon: LogOut,
      action: handleLogout,
    },
  ];

  return (
    <Sidebar className="border-r border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarContent className="flex flex-col h-full p-4">
        {/* Brand section */}
        <div className="px-4 py-6">
          <h2 className="text-2xl font-semibold">SpendSmart</h2>
        </div>

        {/* Main menu */}
        <SidebarGroup className="flex-1">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="flex items-center w-full gap-3 px-4 py-2.5 rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <a
                      onClick={() => handleNavigation(item.url)}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="border-t border-border pt-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="w-full p-2 hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <UserProfileSkeleton />
                ) : (
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userImage} />
                      <AvatarFallback className="bg-primary/10">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm flex flex-col items-start">
                      {user?.name || "Anonymous User"}
                      <span className="text-xs text-muted-foreground">
                        {user?.email || "No email"}
                      </span>
                    </span>
                  </div>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2" align="start" side="top">
              <div className="flex flex-col gap-1">
                
                <ThemeToggle></ThemeToggle>
                
                {profileMenuItems.map((item) => (
                  <Button
                    key={item.title}
                    variant="ghost"
                    className="w-full justify-start gap-3 px-3 py-2 text-sm hover:bg-accent rounded-md"
                    onClick={item.action}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.title}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
