export type ApiKeyType={
    name:string
    id:number
    api_key:string
    role:string
    created_at:Date
}
export type ApiKeyUsageType={
    count:number
    id:number
    api_key:string
    date:Date
}

export interface UsageType{
    date:Date
    total:number
}
export interface ApiKeyUsage{
    api_key_name:string
    total:number
    today:number
}
export interface EndpointUsage{
    endpoint:string
    total:number
    today:number
}