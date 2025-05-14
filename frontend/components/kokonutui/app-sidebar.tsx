"use client";

import Image from "next/image";
import {
    BarChart,
    BarChart2,
    Database,
    FileText,
    Folder,
    HelpCircle,
    LayoutDashboard,
    List,
    Search,
    Settings,
    Users,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavDocuments } from "./nav-documents";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";

const data = {
    user: {
        name: "kokonut",
        email: "hi@kokonut.com",
        avatar: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/kokonutui-ViPVkO6aBLcXfRnAupAA1dkqgyrF7T.png",
        image: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/kokonutui-ViPVkO6aBLcXfRnAupAA1dkqgyrF7T.png",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "#",
            icon: LayoutDashboard,
        },
        {
            title: "Lifecycle",
            url: "#",
            icon: List,
        },
        {
            title: "Analytics",
            url: "#",
            icon: BarChart2,
        },
        {
            title: "Projects",
            url: "#",
            icon: Folder,
        },
        {
            title: "Team",
            url: "#",
            icon: Users,
        },
    ],
    navSecondary: [
        {
            title: "Settings",
            url: "#",
            icon: Settings,
        },
        {
            title: "Get Help",
            url: "#",
            icon: HelpCircle,
        },
        {
            title: "Search",
            url: "#",
            icon: Search,
        },
    ],
    documents: [
        {
            name: "Invoices",
            url: "#",
            icon: Database,
        },
        {
            name: "Payments Analytics",
            url: "#",
            icon: BarChart,
        },
        {
            name: "Reports",
            url: "#",
            icon: FileText,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:p-1.5"
                        >
                            <a
                                href="/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="flex items-center gap-3">
                                    <Image
                                        src="https://kokonutui.com/logo.svg"
                                        alt="Kokonut Logo"
                                        width={24}
                                        height={24}
                                        className="flex-shrink-0 hidden dark:block rounded-full"
                                    />
                                    <Image
                                        src="https://kokonutui.com/logo-black.svg"
                                        alt="Kokonut Logo"
                                        width={24}
                                        height={24}
                                        className="flex-shrink-0 block dark:hidden rounded-full"
                                    />
                                    <div>
                                        <div className="font-semibold hover:cursor-pointer text-gray-900 dark:text-white">
                                            Kokonut
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            Team workspace
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavDocuments items={data.documents} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    );
}
