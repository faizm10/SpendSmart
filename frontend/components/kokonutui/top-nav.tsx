import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import Btn11 from "./btn-11";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

export default function TopNav() {
    const breadcrumbs: BreadcrumbItem[] = [
        { label: "kokonut/ui", href: "#" },
        { label: "dashboard", href: "#" },
    ];

    return (
        <nav className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 text-sm">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-4"
                />
                {breadcrumbs.map((item, index) => (
                    <div key={item.label} className="flex items-center">
                        {index > 0 && (
                            <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400 mx-1" />
                        )}
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-gray-900 dark:text-gray-100">
                                {item.label}
                            </span>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-2 sm:gap-4 sm:ml-0 mr-4">
                <Btn11 className="h-8">Upgrade to Pro</Btn11>
            </div>
        </nav>
    );
}
