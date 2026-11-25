import type { FieldProps } from "@/types/commanTypes";
import { createContext, useContext } from "react"

interface ContextProps{
    id:number
    data: any;
    page:"games"|"api-keys"|"users"|"key-usages";
    operation: "delete" | "update" | "create" |"upload"| null;
    columns: any;
    isLoading: boolean;
    deleteLoading:boolean;
    createLoading:boolean;
    updateLoading:boolean;
    logoLoading:boolean;
    updatedData:any;
    fields: FieldProps[];
    onSetId:(id:number)=>void
    onOperationChange: (operation: "delete" | "update" | "create" |"upload"| null) => void;
    onDelete: () => void;
    onUpdate: (payload:any) => void;
    onEdit:(payload:any)=>void
    onCreate:(payload:any)=>void
    onUpdateLogo:(logo:File)=>void
}

export const AdminContext=createContext<ContextProps>({})

const useAdminContext = () => {
    const context=useContext(AdminContext)
    if (!context) {
        throw new Error("Context not found");
    }
    return context
}

export default useAdminContext