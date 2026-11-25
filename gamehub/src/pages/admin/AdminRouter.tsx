import AppSidebar from "@/components/AppSidebar"
import Loader from "@/components/Loader"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toast"
import { useAuth } from "@/hooks/use-auth"
import type { SidebarLinks } from "@/types/commanTypes"
import { LineChart, LucideFileJson2, LucideGamepad, Users2 } from "lucide-react"
import { Navigate, Outlet } from "react-router"

const AdminRouter = () => {
    const items:SidebarLinks[]=[
        {
            title:"Users",
            url:"/admin/users",
            icon:Users2
        },
        {
            title:"Games",
            url:"/admin/games",
            icon:LucideGamepad
        },
        {
            title:"Api Keys",
            url:"/admin/api-keys",
            icon:LucideFileJson2
        },
        {
            title:"ApiKey Usages",
            url:"/admin/key-usages",
            icon:LineChart
        },
    ]
    const {isLoading,isSuperUser,isAdmin,isSuccess}=useAuth()
    if(isLoading)return<Loader/>
    if(!isSuccess){
        <Navigate to="/login"/>
    }
    if (!isAdmin&&!isSuperUser) {
        <Navigate to='/'/>
    }
    return(
        <SidebarProvider>
            <AppSidebar items={items}/>
            <main className="w-full bg-background overflow-x-hidden scrollbar-thumb-accent">
                <SidebarTrigger/>
                <Outlet />
                <Toaster/>
            </main>
        </SidebarProvider>
    )
}

export default AdminRouter