import Loader from "@/components/Loader"
import { useAuth } from "@/hooks/use-auth"
import { Outlet } from "react-router"

const AuthProtectRoute = () => {
    const {isSuccess,isLoading}=useAuth()
    
    if (isLoading) return <Loader/>
    if (!isSuccess)return<Outlet/> 
}

export default AuthProtectRoute