import { NotebookPen } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator } from "./ui/sidebar";
import type { SidebarLinks } from "@/types/commanTypes";
import { Link } from "react-router";



const AppSidebar = ({items}:{items:SidebarLinks[]}) => {
    return (
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader className="p-4">
                <div className="flex items-center justify-center gap-3 p-2">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                        <NotebookPen size={16}/>
                    </div>
                    <span className="text-xl font-bold tracking-tight">GameHub</span>
                </div>
            </SidebarHeader>
            <SidebarSeparator/>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Workspace</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item,index)=>{
                                return (
                                    <SidebarMenuItem key={index} >
                                        <SidebarMenuButton  render={()=>{
                                            return(
                                                <Link to={item.url} className="inline-flex gap-2">
                                                    <item.icon/>
                                                    <span>{item.title}</span>
                                                </Link>
                                            )
                                        }}/>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

export default AppSidebar

