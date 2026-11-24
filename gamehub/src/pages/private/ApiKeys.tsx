import ErrorFallback from "@/components/ErrorFallback"
import Loader from "@/components/Loader"
import ApiKeyPage from "@/components/private/ApiKeyPage"
import { toast } from "@/components/ui/toast"
import { API_BASE_KEY } from "@/lib/constants"
import type { ApiKeyType } from "@/types/apiKeyTypes"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"

const ApiKeys = () => {
    const [name,setName]=useState<string>()
    const [operation,setOperation]=useState<"delete"|"create"|"update"|"created"|null>(null)
    const [apiKeyId,setApiKeyId]=useState<number|null>(null)
    const queryClient=useQueryClient()
    const onError=(error:any)=>{
            if (axios.isAxiosError(error)) {
                toast.add({
                    title:error.response?.data.detail
                })
            }else{
                toast.add({
                    title:"Error"
                })
            }
        }
    const fetchData=async()=>{
        const response=await axios.get(`${API_BASE_KEY}/apikey`,{
            withCredentials:true
        })
        return response.data
    }
    const createApiKey=async(data:string)=>{
        const response=await axios.post(`${API_BASE_KEY}/apikey`,{name:data},{
            withCredentials:true
        })
        return response.data
    }

    const deleteApiKey=async (id:number) => {
        const response=await axios.delete(`${API_BASE_KEY}/apikey/${id}`,{withCredentials:true})
        return response
    }
    const {data:apiKeys,isLoading,isError,error,refetch}=useQuery<ApiKeyType[]>({
        queryKey:['api-key'],
        queryFn:fetchData,
        refetchOnMount:false,
        refetchOnWindowFocus:false
    })
    const {mutate,data}=useMutation({
        mutationKey:['create-apikey'],
        mutationFn:createApiKey,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['api-key']
            })
            setOperation("created")
        },
        onError
    })
    

    const {mutate:deleteKey}=useMutation({
        mutationKey:['delete-apikey'],
        mutationFn:deleteApiKey,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:['api-key']
            })
            setOperation(null)
        },
        onError
    })
    if (isLoading) return <Loader/>
    if (isError) return <ErrorFallback message={error.message} onRetry={refetch}/> 
    return (
        <ApiKeyPage
        apiKeys={apiKeys!}
        onNameChange={(newName)=>setName(newName)}
        onSubmit={()=>{
            mutate(name!)
        }}
        onDelete={()=>{
            deleteKey(apiKeyId!)
        }}
        onApiKeyChange={(id)=>setApiKeyId(id)}
        operation={operation}
        onOperationChange={(operation)=>setOperation(operation)}
        apiKey={data?.api_key}
        />
    )
}

export default ApiKeys