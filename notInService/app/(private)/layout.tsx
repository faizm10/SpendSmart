import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 flex flex-col min-h-screen">
          {/* <div className="flex items-center h-16 px-4 border-b border-border md:hidden"> */}
          <SidebarTrigger className="p-2 hover:bg-accent rounded-md" />
          {/* </div> */}
          <div className="flex-1 container mx-auto p-4 md:p-8">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
