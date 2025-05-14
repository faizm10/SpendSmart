import type { ReactNode } from "react";
import TopNav from "./top-nav";
import { AppSidebar } from "./app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex h-screen">
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "calc(var(--spacing) * 72)",
                        "--header-height": "calc(var(--spacing) * 12)",
                    } as React.CSSProperties
                }
            >
                <AppSidebar variant="inset" />
                <SidebarInset>
                    <div className="w-full flex flex-1 flex-col">
                        <TopNav />
                        <main className="flex-1 overflow-auto p-6">
                            {children}
                        </main>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}
