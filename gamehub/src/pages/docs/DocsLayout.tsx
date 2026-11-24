import AppSidebar from "@/components/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import type { SidebarLinks } from "@/types/commanTypes"
import { Outlet } from "react-router"
import { FileJson, LayoutDashboard, Rocket, Search } from "lucide-react";

const DocsLayout = () => {
    const items:SidebarLinks[]=[
        {
            title:"Overview",
            url:'/docs/overview',
            icon:LayoutDashboard
        },
        {
            title:"Quickstart",
            url:'/docs/quick-start',
            icon:Rocket
        },
        {
            title:"Api Format",
            url:'/docs/api-format',
            icon:FileJson
        },
        {
            title:"Search Queries",
            url:'/docs/search-queries',
            icon:Search
        },
    ]
    return (
        <SidebarProvider>
            <AppSidebar items={items}/>
            <main className="w-full px-8">
                <SidebarTrigger/>
                <Outlet/>
            </main>
        </SidebarProvider>
    )
}

export default DocsLayout