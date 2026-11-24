import { API_BASE_KEY } from "@/lib/constants"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useAuth=()=>{
    const fetchData=async()=>{
        const response=await axios.get(`${API_BASE_KEY}/auth/is_authenticated`,{withCredentials:true})
        return response.data
    }
    const {data,isLoading,isError,error,isSuccess}=useQuery({
        queryFn:fetchData,
        queryKey:['is_auth_user'],
        refetchOnMount:false,
        refetchOnWindowFocus:false,
    })
    if (isSuccess) {
        return {
            isLoading,
            isError,
            isSuccess:data.success,
            isSuperUser:data.is_superuser,
            isAdmin:data.is_admin
        }   
    }
    return {
        isError,
        error,
        isLoading
    }
}