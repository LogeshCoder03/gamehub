import { NotebookPen } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "./ui/sidebar";
import type { SidebarLinks } from "@/types/commanTypes";
import { Link, useLocation } from "react-router";

const AppSidebar = ({ items }: { items: SidebarLinks[] }) => {
  const { open } = useSidebar();
  const {pathname}=useLocation()
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <NotebookPen size={16} />
          </div>
          {open && (
            <span className="text-xl font-bold tracking-tight">GameHub</span>
          )}
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => {
                return (
                  <SidebarMenuItem key={index} className={`${pathname.includes(item.url)&&"bg-accent"} `}>
                    <SidebarMenuButton
                      render={
                        <Link to={item.url} className="inline-flex gap-2">
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      }
                    />
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
