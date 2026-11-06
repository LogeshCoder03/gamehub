import type { AxiosError } from "axios"
import ErroSection from "../ErrorFallback"
import type { MetadataType } from "@/types/gameTypes"
import StaticalCard, { StaticalCardSkeleton } from "./StaticalCard"


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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 p-4">
            <StaticalCard title={data.total_games} description="Total Games" className="bg-linear-to-r from-pink-300 via-red-300 to-rose-500"/>
            <StaticalCard title={data.indoor_games} description="Indoor Games" className="bg-linear-to-r from-blue-400 via-purple-500 to-indigo-500"/>
            <StaticalCard title={data.outdoor_games} description="Outdoor Games" className="bg-linear-to-r from-cyan-400 via-sky-500 to-emerald-400"/>
            <StaticalCard title={data.online_games} description="Online Games" className="bg-linear-to-r from-yellow-400 via-amber-500 to-orange-300"/>
        </div>
    )
}

export default StaticalSection