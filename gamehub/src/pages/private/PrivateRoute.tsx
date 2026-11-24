import AppSidebar from '@/components/AppSidebar'
import Loader from '@/components/Loader'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useAuth } from '@/hooks/use-auth'
import type { SidebarLinks } from '@/types/commanTypes'
import { KeySquare, LayoutDashboard } from 'lucide-react'
import { Outlet } from 'react-router'

const PrivateRoute = () => {
    const items:SidebarLinks[]=[
        {
            title:"Dashboard",
            url:"/dashboard",
            icon:LayoutDashboard
        },
        {
            title:"API Keys",
            url:"/api-keys",
            icon:KeySquare
        }
    ]
    const {isSuccess,isLoading}=useAuth()
    
    if (isLoading) return <Loader/>
    if (isSuccess)
    return(
        <SidebarProvider>
            <AppSidebar items={items}/>
            <main className='w-full'>
                <SidebarTrigger/>
                <Outlet />
            </main>
        </SidebarProvider>
    )

}

export default PrivateRoute