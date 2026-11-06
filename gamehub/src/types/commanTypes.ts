import {type ColumnDef} from '@tanstack/react-table'

export type FieldProps={
    label:string
    name:string
    type:string
    value?:string
    onEdit?:(data:any)=>void,
    options?:any[]
}

export interface DocProps{
    id:number
    title:string
    description:string
    code:string
    endPoint?:string
}

export interface AdminConfig<T>{
    queryKey:string[],
    queryFn:()=>Promise<T[]>
    columns:()=>ColumnDef<any,any,any>[]
}


export interface SidebarLinks{
    title:string;
    url:string,
    icon:React.ElementType
}