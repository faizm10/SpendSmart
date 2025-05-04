"use client";

import type React from "react";

import Link from "next/link";
import { signOutAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/data";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarRail,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen flex-col">
        {/* Main content with sidebar */}
        <div className="flex flex-1 -hidden">
          {/* Sidebar */}
          <Sidebar collapsible="icon">
            <SidebarHeader>
              <div className="p-2">
                <Link href="/dashboard" className="flex items-center px-2 py-3">
                  <span className="text-xl font-semibold">SpendSmart</span>
                </Link>
              </div>
            </SidebarHeader>

            <SidebarContent>
              <SidebarMenu>
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.name}
                      >
                        <Link href={item.href}>
                          <item.icon />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
              <div className="p-2 flex items-center justify-between">
                <ThemeSwitcher />
                <form action={signOutAction}>
                  <Button type="submit" variant="outline" size="sm">
                    Sign out
                  </Button>
                </form>
              </div>
            </SidebarFooter>

            <SidebarRail />
          </Sidebar>

          <main className="flex-1 overflow-y-auto bg-background p-6">
            <div className="flex items-center justify-end mb-6">
              <SidebarTrigger className="lg:hidden" />
            </div>
            <div className="w-full">
            {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
