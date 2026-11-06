import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { type AxiosResponse } from "axios"
import { useCallback, useState } from "react"
import { API_ADMIN_URI } from "@/lib/constants"
import { apiKeyFields, apiKeyUsageFields, gameFields, userFields } from "@/lib/fields"
import { apiKeyColumns, apiKeyUsageColumns, gameColumns, userColumns } from "@/components/admin/columns"
import type { FieldProps } from "@/types/commanTypes"
import { toast } from "@/components/ui/toast"

interface HookProps{
    page:"games"|"api-keys"|"users"|"key-usages",
}

interface StateProps{
    apiUri:string
    columns:any
    fields:FieldProps[]
}

interface MetadataType{
    users:StateProps
    games:StateProps
    "api-keys":StateProps
    "key-usages":StateProps
}
const metadata:MetadataType = {
    users: {
    apiUri: "users",
    columns: userColumns,
    fields: userFields,
    },
    games: {
    apiUri: "games",
    columns: gameColumns,
    fields: gameFields,
    },
    "api-keys": {
    apiUri: "api-keys",
    columns: apiKeyColumns,
    fields: apiKeyFields,
    },
    "key-usages": {
    apiUri: "key-usages",
    columns: apiKeyUsageColumns,
    fields: apiKeyUsageFields,
    },
};

const useAdmin=({page}:HookProps)=>{
    const meta=metadata[page as "games"|"api-keys"|"users"|"key-usages"]
    const queryClient=useQueryClient()
    const [id,setId]=useState<number|null>(null)
    const [operation,setOperation]=useState<"delete"|"update"|"create"|"upload"|null>(null)
    const [updatedData,setUpdatedData]=useState<null>()
    const handleSetId=useCallback((newId:number|null)=>setId(newId),[id])
    const handleSetOperation=useCallback((newOperation:"delete"|"update"|"create"|"upload"|null)=>setOperation(newOperation),[operation])
    const handleSetUpdatedData=useCallback((payload:any)=>setUpdatedData(payload),[updatedData])
    const columns=meta.columns({
        onSetId:handleSetId,
        onSetOperation:handleSetOperation,
        onHandleUpdate:handleSetUpdatedData
    })
    const onError=(error:any)=>{
        if (axios.isAxiosError(error)) {
            toast.add({
                title:error.response?.data.detail
            })
        }else{
            toast.add({
                title:"Error occured"
            })
        }
        setId(null)
        setOperation(null)
        setUpdatedData(null)
    }
    const onSuccess=(response:AxiosResponse)=>{
        queryClient.invalidateQueries({
            queryKey:[`admin-${page}`]
        })
        if (response.status===204) {
            toast.add({
                title:"Deleted"
            })
        }else{
            toast.add({
                title:response.data
            })
        }
        setId(null)
        setOperation(null)
        setUpdatedData(null)
    }
    const fetchData=async()=>{
        return (await axios.get(`${API_ADMIN_URI}/${meta.apiUri}`,{withCredentials:true})).data
    }
    const createData=async (payload:any) => {
        const response=await axios.post(`${API_ADMIN_URI}/${meta.apiUri}`,payload,{withCredentials:true})
        return response
    }
    const updateData=async(payload:any)=>{
        const response=await axios.put(`${API_ADMIN_URI}/${meta.apiUri}/${payload.id}`,payload,{withCredentials:true})
        return response
    }
    const updateLogo=async(logo:File)=>{
        const formData=new FormData()
        formData.append('logo',logo)
        
        const response=await axios.put(
            `${API_ADMIN_URI}/games/update-logo/${id}`,
            formData,
            {
                withCredentials:true
            }
        )
        return response.data
    }
    const deleteData=async()=>{
        const response=await axios.delete(`${API_ADMIN_URI}/${meta.apiUri}/${id}`,{withCredentials:true})
        return response
    }
    const {data=[],isLoading}=useQuery({
        queryKey:[`admin-${page}`],
        queryFn:fetchData,
        refetchOnMount:false,
        refetchOnWindowFocus:false
    })
    const {mutate:handleDelete,isPending:deleteLoading}=useMutation({
        mutationKey:[`delete-${page}`],
        mutationFn:deleteData,
        onSuccess,
        onError
    })
    const {mutate:handleUpdate,isPending:updateLoading}=useMutation({
        mutationKey:[`update-${page}`],
        mutationFn:updateData,
        onSuccess,
        onError,
    })
    
    const {mutate:handleCreate,isPending:createLoading}=useMutation({
        mutationKey:[`create-${page}`],
        mutationFn:createData,
        onSuccess,
        onError
    })
    const {mutate:handleUpdateLogo,isPending:logoLoading}=useMutation({
        mutationKey:['update-logo'],
        mutationFn:updateLogo,
        onError,
        onSuccess
    })
    
    return {
        id,
        page,
        operation,
        data,
        columns,
        updatedData,
        isLoading,
        fields:meta.fields,
        deleteLoading,
        createLoading,
        updateLoading,
        logoLoading,
        onCreate:handleCreate,
        onUpdate:handleUpdate,
        onUpdateLogo:handleUpdateLogo,
        onDelete:handleDelete,
        onSetId:handleSetId,
        onOperationChange:handleSetOperation,
        onEdit:handleSetUpdatedData
    }
}


export {useAdmin}