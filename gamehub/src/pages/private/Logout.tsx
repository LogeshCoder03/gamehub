import { API_BASE_KEY } from "@/lib/constants"
import { useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router"

const Logout = () => {
    const navigate=useNavigate()
    const queryClient=useQueryClient()
    const logoutFunc=async()=>{
        const response=await axios.get(`${API_BASE_KEY}/auth/logout`,{withCredentials:true})
        if (response.status=200) {
            queryClient.invalidateQueries({
                queryKey:["is_auth_user"]
            })
            navigate('/')
        }
    }
    useEffect(()=>{
        logoutFunc()
    },[])
    return <h1>Logout</h1>
}

export default Logout