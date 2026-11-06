import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IndianRupee } from "lucide-react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../ui/skeleton"

interface Props{
    title:string|number
    description:string
    icon?:React.ReactNode
    className:string
}

const StaticalCard=({title,description,icon:Icon,className}:Props)=>{
    return(
        <Card className="w-full max-w-md py-9 hover:shadow-2xl hover:backdrop-blur-3xl transition-all duration-300 border-2 border-slate-50">
            <CardHeader className="items-center justify-center gap-y-0">
                <div className={cn("size-18 flex items-center justify-center text-white rounded-full",className)}>
                    <IndianRupee/>
                </div>
            </CardHeader>
            <CardContent>
                <CardTitle className="items-center text-center font-bold text-5xl flex gap-2 justify-center">{title}{Icon}</CardTitle>
                <CardDescription className="text-center font-semibold text-xl mt-2 text-gray-600">{description}</CardDescription>
            </CardContent>
        </Card>
    )
}
export const StaticalCardSkeleton=()=>{
    return(
        <Card className="w-full max-w-md py-9 hover:shadow-2xl hover:backdrop-blur-3xl transition-all duration-300 border-2 border-slate-50">
            <CardHeader className="items-center justify-center gap-y-0">
                <Skeleton className="size-18 flex items-center justify-center rounded-full"/>
            </CardHeader>
            <CardContent className="flex items-center justify-center flex-col">
                <Skeleton className="h-6 w-40"/>
                <Skeleton className="h-6 w-40 mt-2"/>
            </CardContent>
        </Card>
    )
}

export default StaticalCard