import type { AxiosError } from "axios"
import ErroSection from "../ErrorFallback"
import type { MetadataType } from "@/types/gameTypes"
import StaticalCard, { StaticalCardSkeleton } from "./StaticalCard"
import { Gamepad2, House, Trees, Wifi } from "lucide-react"


type Props={
    isLoading:boolean
    data:MetadataType
    error:AxiosError|Error
    refetch:()=>void
}

const StaticalSection = ({isLoading,data,error,refetch}:Props) => {
    if (isLoading) {
        return <div className="grid grid-cols-1 md:grid-cols-4 gap-10 p-4">
            {Array.from({"length":4}).map((_,idx)=><StaticalCardSkeleton key={idx}/>)}
        </div>
    }
    if (error) {
        return <ErroSection message={error.message} onRetry={refetch}/>
    }
    return (
        <section className="flex justify-center w-full flex-col gap-6">
            <div className="w-full flex items-center text-3xl gap-2 font-bold">
                <h1 className="">Platform Overview</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 p-4">
                <StaticalCard count={data?.total_games} title="Total Games" icon={<Gamepad2/>}/>
                <StaticalCard count={data?.indoor_games} title="Indoor Games" icon={<House/>}/>
                <StaticalCard count={data?.outdoor_games} title="Outdoor Games" icon={<Trees/>}/>
                <StaticalCard count={data?.online_games} title="Online Games" icon={<Wifi/>}/>
            </div>
        </section>

    )
}

export default StaticalSection