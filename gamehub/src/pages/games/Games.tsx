import ErrorFallback from "@/components/ErrorFallback"
import GameFilterSection from "@/components/game/GameFilterSection"
import GameCard, { GameSkeleton } from "@/components/game/GameCard"
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { useDebounce } from "@/hooks/use-debounce"
import { API_BASE_KEY, API_HEADER } from "@/lib/constants"
import type { BaseGameType, Gametype, Popularity } from "@/types/gameTypes"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"

const initialFilters = {
  search: "",
  downloads: "all",
  rating: "all",
  company: "all",
  launchDate: "all",
  category: "all",
  type: "all",
  popularity: "all",
};

export interface FilterProps{
  search: string,
  downloads: string,
  rating: string,
  company: string,
  launchDate: string,
  category: string,
  type:string
  popularity:string
}

type GameProps={
page:number
data:BaseGameType[]
total_pages:number
total_data:number
}



const Games = () => {
    const [filter,setFilter]=useState<FilterProps>(initialFilters)
    const [page,setPage]=useState<number>(1)
    const debouncedValue=useDebounce(filter.search,500)
    const navigate=useNavigate()


    const fetchData=async()=>{
        const url=new URL(`${API_BASE_KEY}/games`)
        url.searchParams.set('page',String(page))
        debouncedValue&&url.searchParams.set('search',debouncedValue)
        Object.entries(filter).forEach(
            ([k,v])=>{
                if (k!=="search" && v.trim()!=="all"){
                    url.searchParams.set(k,v)
                }
            }
        )
        console.log(url);
    
        const response=await axios.get(url.toString(),{headers:{
            "X-API-KEY":API_HEADER
        }})
        return response.data
    }
    const {data,isLoading,isError,error,refetch}=useQuery<GameProps>({
        queryKey:['all_games',filter,debouncedValue,page],
        queryFn:fetchData,
        refetchOnWindowFocus:false,
        refetchOnMount:false
    })
    
    const handleFilter=(key:string,value:string)=>{
        setFilter(prev=>(
            {...prev,[key]:value}
        ))
    }
    
    // if (isError) return <ErrorFallback message={error.message} onRetry={refetch}/>
    return (
        <div className="min-h-screen w-full p-2">
            <div className="m-4 text-center">
                <h1 className="font-bold text-3xl">All Games</h1>
            </div>
            <GameFilterSection
            onFiltersChange={handleFilter}
            filters={filter}
            resetFilter={()=>setFilter(initialFilters)}
            // onSearch={handleSearch}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-8 px-2">
                {isLoading?Array.from({length:3}).map((_,idx)=><GameSkeleton key={idx}/>):
                data?.data?.map(game=>
                <GameCard 
                game={game} 
                key={game.id} 
                onClick={()=>navigate(`/games/${game.id}`)}/>)}
            </div>
            <div className="mt-10 mb-5">
                <Pagination>
                    {data?.total_pages!=0&&
                    <PaginationContent>
                        {page!=1&&<PaginationItem><PaginationPrevious onClick={()=>setPage(prev=>prev-1)} /></PaginationItem>}
                        {page!==data?.total_pages&&<PaginationItem><PaginationNext onClick={()=>setPage(prev=>prev+1)} /></PaginationItem>}
                    </PaginationContent>
                    }
                </Pagination>
            </div>
        </div>
    )
}

export default Games