import { API_BASE_KEY } from "@/lib/constants"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

export const useAuth=()=>{
    const queryClient=useQueryClient()
    const fetchData=async()=>{
        const response=await axios.get(`${API_BASE_KEY}/auth/is_authenticated`,{withCredentials:true})
        return response.data
    }
    const refreshToken=async()=>{
        await axios.get(`${API_BASE_KEY}/auth/refresh-token`,{withCredentials:true})
            queryClient.invalidateQueries({
                queryKey:["is_auth_user"]
            })
    }
    const {data,isLoading,isError,error,isSuccess}=useQuery({
        queryFn:fetchData,
        queryKey:['is_auth_user'],
        refetchOnMount:false,
        refetchOnWindowFocus:false,
    })
    if (isSuccess) {
        if (!data.success) {
            if (data.is_refresh_token) {
                refreshToken()
            }   
        }
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