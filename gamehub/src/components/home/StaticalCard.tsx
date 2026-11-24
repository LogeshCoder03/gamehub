import type React from "react"
import { Skeleton } from "../ui/skeleton"
import CountUp from "./CountUp"

interface Props{
    title:string|number
    description?:string
    icon?:React.ReactNode
    count:number
}

const StaticalCard=({title,count,description,icon:Icon}:Props)=>{
    return(
        <div className="shadow-sm rounded-xl px-6 p-4 group border-2 border-muted/50 flex flex-col transition-all hover:scale-101 hover:shadow-md hover:duration-500">
            <div className="inline-flex group-hover:ring-2 group-hover:ring-offset-2 group-hover:ring-accent     size-12 bg-muted rounded-lg shadow-2xs items-center justify-center mb-4 hover:outline-2 hover:outline-muted transition-all duration-300 delay-200">
                {Icon}
            </div>
            <div className="mt-auto">
                <div className="font-bold text-3xl pb-1">
                    <CountUp target={count} className="mb-0.5 pr-0.5"/>
                    <span>+</span>
                </div>
                <h4 className="font-medium text-lg pb-2">{title}</h4>
                <h4 className="font-medium text-sm text-muted-foreground">{description}</h4>
            </div>
        </div>
    )
}
export const StaticalCardSkeleton=()=>{
    return(
        <div></div>
        // <Card className="w-full max-w-md py-9 hover:shadow-2xl hover:backdrop-blur-3xl transition-all duration-300 border-2 border-slate-50">
        //     <CardHeader className="items-center justify-center gap-y-0">
        //         <Skeleton className="size-18 flex items-center justify-center rounded-full"/>
        //     </CardHeader>
        //     <CardContent className="flex items-center justify-center flex-col">
        //         <Skeleton className="h-6 w-40"/>
        //         <Skeleton className="h-6 w-40 mt-2"/>
        //     </CardContent>
        // </Card>
    )
}

export default StaticalCard