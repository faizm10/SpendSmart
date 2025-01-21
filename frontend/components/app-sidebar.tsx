// "use client";
// import { Home, Settings, User2, ChevronUp } from "lucide-react";
// import { signOutAction } from "@/app/actions";

// import { items } from "@/lib/data";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarFooter,
// } from "@/components/ui/sidebar";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { useTheme } from "next-themes";
// import { Moon, Sun } from "lucide-react";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// export function AppSidebar() {
//   const { setTheme } = useTheme();

//   return (
//     <Sidebar className="flex flex-col h-screen">
//       <SidebarContent className="flex-1 flex flex-col">
//         <SidebarGroup>
//           <SidebarGroupLabel>SpendSmart</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {items.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild>
//                     <a href={item.url}>
//                       <item.icon />
//                       <span>{item.title}</span>
//                     </a>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//             <SidebarContent>
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="outline" size="icon">
//                     <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//                     <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//                     <span className="sr-only">Toggle theme</span>
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuItem onClick={() => setTheme("light")}>
//                     Light
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => setTheme("dark")}>
//                     Dark
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </SidebarContent>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//       <SidebarFooter className="mt-auto">
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <SidebarMenuButton>
//                   <Settings /> Settings
//                   <ChevronUp className="ml-auto" />
//                 </SidebarMenuButton>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent
//                 side="bottom"
//                 className="w-[--radix-popper-anchor-width]"
//               >
//                 <Link href="/dashboard/profile">
//                   <DropdownMenuItem>
//                     <span>Profile</span>
//                   </DropdownMenuItem>
//                 </Link>
                
//                 <DropdownMenuItem>
//                   <span onClick={signOutAction}>Sign Out</span>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarFooter>
//     </Sidebar>
//   );
// }
