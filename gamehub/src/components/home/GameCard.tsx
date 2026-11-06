import React from 'react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import type { BaseGameType } from '@/types/gameTypes';

type Props={
    game:BaseGameType,
    onClick:()=>void
}

const GameCard:React.FC<Props> = ({game,onClick}) => {
    return (
        <Card className='w-full max-w-md pt-0'>
            <CardHeader className='px-0 py-0'>
                <img alt={game.name} className='rounded-t-md object-cover'/>
                <CardTitle className='px-2 py-1 capitalize'>{game.name}</CardTitle>
                <CardDescription className='px-2 line-clamp-2'>{game.description}</CardDescription>
            </CardHeader>
            <CardContent className='px-2 my-0 flex justify-between'>
                <div className="flex gap-x-1">
                    <h1 className='font-semibold'>{game.details.downloads}</h1>
                    <p className='text-gray-500 font-semibold'>Downloards</p>
                </div>
                <div className="px-2">
                    <p className='font-bold text-gray-800'>{new Date(game.development_details.published_at).getFullYear()}</p>
                </div>
            </CardContent>
            <CardFooter className='px-2 flex justify-between'>
                <CardAction>
                    <Button className='bg-indigo-400 hover:bg-indigo-600 cursor-pointer' onClick={onClick}>View</Button>
                </CardAction>
                <div className="flex gap-x-0.5">
                    {Array.from({length:game.details.ratings}).map((_,index)=><Star key={index} fill='yellow' size={20} className='text-yellow-500'/>)}
                </div>
            </CardFooter>
        </Card>
    )
}

export const GameSkeleton=()=>{
    return(
        <div className='w-full max-w-md pt-0 rounded-tr-2xl'>
                <Skeleton className='w-full h-56 rounded-b-none bg-gray-200'/>
                <Skeleton className='mt-2 h-4 w-40 ml-1 bg-gray-200'/>
                <Skeleton className='m-2 h-2 w-86 bg-gray-200'/>
                <Skeleton className='m-2 h-2 w-86 bg-gray-200'/>
                <Skeleton className='m-2 h-2 w-8/12 bg-gray-200'/>
            <div className='px-2 my-4 flex justify-between'>
                <Skeleton className='h-6 w-40 bg-gray-200'/>    
                <Skeleton className='w-20 h-6 bg-slate-200'/>
            </div>
            <div className='px-2 mt-5 flex justify-between mb-2'>
                <Skeleton className='h-8 w-20 bg-gray-200'/>
                <Skeleton className='h-6 w-30 bg-gray-200'/>
            </div>
        </div>
    )
}

export default GameCard