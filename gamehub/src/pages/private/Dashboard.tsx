import ErrorFallback from "@/components/ErrorFallback"
import Loader from "@/components/Loader"
import NiceLineChart from "@/components/private/NiceLineChart"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { API_BASE_KEY } from "@/lib/constants"
import type { ApiKeyUsage, EndpointUsage, UsageType } from "@/types/apiKeyTypes"
import { useQueries } from "@tanstack/react-query"
import axios from "axios"

const Dashboard = () => {
    const fetchData=async()=>{
        return (await axios.get(`${API_BASE_KEY}/apikey/usages`,{withCredentials:true})).data
    }
    const fetchApiKeyUsages=async()=>{
        return (await axios.get(`${API_BASE_KEY}/apikey/usages/api-keys`,{withCredentials:true})).data
    }
    const fetchApiKeyEndpoints=async()=>{
        return (await axios.get(`${API_BASE_KEY}/apikey/usages/endpoints`,{withCredentials:true})).data
    }
    const [apiKeyUsages,keyUsagesData,endPointUsagesData]=useQueries({
        queries:[
        {
            queryKey:['api-key-usages'],
            queryFn:fetchData,
            refetchOnWindowFocus:false,
            refetchOnMount:false
        },
        {
            queryKey:['key-usages'],
            queryFn:fetchApiKeyUsages,
            refetchOnWindowFocus:false,
            refetchOnMount:false
        },
        {
            queryKey:['endpoint-usages'],
            queryFn:fetchApiKeyEndpoints,
            refetchOnWindowFocus:false,
            refetchOnMount:false
        },
        ]
    })
    
    const {isLoading,data:usagesData=[],error:keyError}=apiKeyUsages
    const {data:keyUsages=[],error:usageError}=keyUsagesData
    const {data:endpointUsages=[],error:endpointError}=endPointUsagesData
    if (isLoading) return <Loader/>
    const usages=usagesData.map((usage:UsageType)=>{
        const usageDate=new Date(usage.date).toLocaleDateString("en-US",{
            month:"short",
            day:"numeric"
        })
        return {
            total:usage.total,
            date:usageDate
        }
    })
    return (
        <div className="w-full px-5">
            <div className="grid grid-rows-2 gap-5">
                <div className="grid grid-cols-2 gap-4">
                    <div className="">
                        <NiceLineChart 
                        title="Api Key Usage"
                        data={usages}
                        error={keyError!}
                        />
                    </div>
                    <Card className="w-full px-2">
                        {endpointError?<ErrorFallback message={endpointError.message}/>:(
                            <>
                                <h2 className="font-bold text-xl text-center">Endpoint Usages</h2>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Endpoint</TableHead>
                                            <TableHead>Today</TableHead>
                                            <TableHead>Total</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {endpointUsages.map((usage:EndpointUsage,idx:number)=>(
                                            <TableRow key={idx}>
                                                <TableCell>{usage.endpoint}</TableCell>
                                                <TableCell>{usage.today}</TableCell>
                                                <TableCell>{usage.total}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </>
                        )}
                    </Card>
                </div>
                <div className="space-y-5">
                    <div className="">
                        <h1 className="font-bold text-2xl">API Keys Usages</h1>
                        <p className="pt-3">
                            View your API key usage statistics,including total requests and today's activity
                        </p>
                    </div>
                    <Card className="w-full p-2">
                        {usageError?<ErrorFallback message={usageError.message}/>:(
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Api Key</TableHead>
                                        <TableHead>Today</TableHead>
                                        <TableHead>Total</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {keyUsages.map((usage:ApiKeyUsage,idx:number)=>(
                                        <TableRow key={idx}>
                                            <TableCell>{usage.api_key_name}</TableCell>
                                            <TableCell>{usage.today}</TableCell>
                                            <TableCell>{usage.total}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Dashboard