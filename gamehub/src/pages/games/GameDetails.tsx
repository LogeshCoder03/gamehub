import { API_BASE_KEY, API_HEADER } from "@/lib/constants"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useParams } from "react-router"
import { Calendar, Download, Gamepad, Gamepad2, Globe, Monitor, Pin, Smartphone, Star, TrendingUp, Users } from 'lucide-react'
import type React from 'react';
import type { BaseGameType } from "@/types/gameTypes"
import Loader from "@/components/Loader"
import ErrorFallback from "@/components/ErrorFallback"

const availableOnIcons={
    mobile:<Smartphone/>,
    pc:<Monitor/>,
    playstation:<Gamepad2/>
}

interface StatsProps{
    title:string;
    value:string|number;
    icon:React.ReactElement
}

const StatsCard=({icon,value,title}:StatsProps)=>{
    return(
        <div className="space-y-1.5 text-cyan-500">
            <div className="shadow w-fit rounded-md bg-white flex items-center justify-center p-2">
                {icon}
            </div>
            <h2 className='font-semibold text-3xl text-cyan-400'>{value}</h2>
            <p className='text-xs text-gray-600 font-semibold'>{title}</p>
        </div>
    )
}
const InfoCard=({icon,value,title}:StatsProps)=>{
    return(
        <div className="space-y-1.5 text-cyan-500 flex shadow bg-slate-100 rounded-md p-3 items-center hover:-translate-y-2 duration-300">
            <div className="shadow rounded-md bg-zinc-100 flex items-center justify-center p-2 mt-2">
                {icon}
            </div>
            <div className="flex flex-col px-4">
                <h2 className='font-semibold text-gray-600 text-xs'>{title}</h2>
                <h2 className='font-semibold text-black text-sm capitalize'>{value}</h2>
            </div>
        </div>
    )
}

const Section=({children,title}:{children:React.ReactNode,title:string})=>{
    return(
        <div className="flex flex-col">
            <h1 className='text-3xl mb-6 font-bold'>{title}</h1>
            {children}
        </div>
    )
}

const GameDetails = () => {
    const {id}=useParams()
    const getGame=async()=>{
        const response=await axios.get(`${API_BASE_KEY}/games/${id}`,{
            headers:{
                "X-API-KEY":API_HEADER
            }
        })
        return response.data
    }
    const {data:game,isLoading,isError,error,refetch}=useQuery<BaseGameType>({
        queryKey:['game-details',id],
        queryFn:getGame,
        refetchOnMount:false,
        refetchOnWindowFocus:false
    })
    
    if (isLoading) return <Loader/>
    if (isError) return <ErrorFallback message={error.message} onRetry={refetch}/>
    return (
        <div className="py-10 px-10  space-y-10 bg-gray-50">
            <div className="flex gap-6">
                <div className="flex relative h-35 w-40">
                    <img className='bg-fixed shadow-2xl rounded object-cover'/>
                    <div className="size-6 absolute bottom-0 right-0 -mb-1.5 -mr-1.5 rounded-full bg-cyan-400 flex items-center justify-center">
                        <Gamepad className='size-4'/>
                    </div>
                </div>
                <div className="flex flex-col">
                    <h1 className='text-7xl font-bold mb-2 text-shadow-md'>{game?.name}</h1>
                    <p className='text-gray-600 font-semibold'>ere eroes are orge Ine 13 a ron ler</p>
                </div>
            </div>
            <div className='w-full flex py-6 shadow-md bg-slate-50 rounded-md items-center justify-evenly ring-2 ring-gray-200 duration-300 hover:ring-4'>
                <StatsCard icon={<Download/>} title="downloars" value={game?.details.downloads!}/>
                <StatsCard icon={<TrendingUp/>} title="Trend" value={game?.details.downloads!}/>
                <StatsCard icon={<Star/>} title="Ratings" value={game?.details.ratings!}/>
                <StatsCard icon={<Users/>} title="Active Players" value={game?.details.downloads!}/>
            </div>
            <Section title='About The Game'>
                <div className="w-full shadow whitespace-nowrap bg-slate-100 p-5 rounded text-gray-600 border font-normal hover:ring-3 hover:ring-gray-300 duration-500">
                    {game?.description}
                </div>
            </Section>
            <Section title='Game Information'>
                <div className="w-full p-4  grid grid-cols-3 gap-y-5 gap-x-3">
                    <InfoCard icon={<Gamepad2/>} title="Type" value={game?.details.type!}/>
                    <InfoCard icon={<Pin/>} title="Category" value={game?.details.category!}/>
                    <InfoCard icon={<Calendar/>} title="type" value={new Date(game?.development_details.published_at!).toDateString()}/>
                    <InfoCard icon={<Globe/>} title="type" value={game?.development_details.made_in!}/>
                </div>
            </Section>
            {
                game?.details.available_on.length!==0&&(
                <Section title='Available On' >
                    <div className="w-full shadow-xs bg-slate-100 p-5 rounded text-gray-600 border font-normal flex gap-2">
                        {game?.details.available_on?.map((availableOn,idx)=>{
                            const Icon=availableOnIcons[availableOn]
                            return (<div key={idx} className="flex flex-col shadow-md bg-white rounded-md py-3 px-5 text-blue-400 items-center justify-center">
                                {Icon}
                                <h1 className='font-normal text-gray-800'>{availableOn}</h1>
                            </div>)
                        })}
                    </div>
                </Section>
                )
            }
        </div>
    )
}

export default GameDetails