import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import type { ApiKeyProps } from "./ApiKeyPage"

const ApiKeyTable = ({apiKeys,onApiKeyChange,onOperationChange}:Partial<ApiKeyProps>) => {
    return (
        <Table>
            <TableCaption>API Keys</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Id</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Key</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {apiKeys?.map(apiKey=>(
                    <TableRow key={apiKey.id}>
                        <TableCell>{apiKey.id}</TableCell>
                        <TableCell>{apiKey.name}</TableCell>
                        <TableCell >{apiKey.api_key}</TableCell>
                        <TableCell>{new Date(apiKey.created_at).toDateString()}</TableCell>
                        <TableCell>
                            <Button 
                            className="bg-red-500 hover:bg-red-600" 
                            size="icon"  
                            onClick={()=>{
                                onApiKeyChange?.(apiKey.id)
                                onOperationChange?.("delete")
                            }}>
                                <Trash2 className="text-white"/>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>    
    )
}   

export default ApiKeyTable