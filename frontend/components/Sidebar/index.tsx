"use client";

import {
  Calendar,
  Home,
  Inbox,
  LogOut,
  Search,
  Settings,
  UserCircle,
} from "lucide-react";
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

// Simplified menu items
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Messages",
    url: "/messages",
    icon: Inbox,
    badge: "3",
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

const profileMenuItems = [
  {
    title: "View Profile",
    icon: UserCircle,
    onClick: () => (window.location.href = "/profile"),
  },
  {
    title: "Settings",
    icon: Settings,
    onClick: () => (window.location.href = "/settings"),
  },
  {
    title: "Logout",
    icon: LogOut,
    onClick: async () => {
      await signOut();
      console.log("Logging out...");
    },
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

  return (
    <Sidebar className="border-r border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarContent className="flex flex-col h-full p-4">
        {/* Brand section */}
        <div className="px-4 py-6">
          <h2 className="text-2xl font-semibold">AuthCraft</h2>
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
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                      {item.badge && (
                        <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
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
                {profileMenuItems.map((item) => (
                  <Button
                    key={item.title}
                    variant="ghost"
                    className="w-full justify-start gap-3 px-3 py-2 text-sm hover:bg-accent rounded-md"
                    onClick={item.onClick}
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
