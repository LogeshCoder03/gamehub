import React from "react";
import ErroSection from "@/components/ErrorFallback";
import type { AxiosError } from "axios";
import type { GameDataType } from "@/types/gameTypes";
import GameCard, { GameSkeleton } from "../game/GameCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

type Props = {
  isError: boolean;
  isLoading: boolean;
  gameData: GameDataType;
  error: AxiosError|Error;
  onNavigate: (id: number) => void;
  refetch: () => void;
};

const GameSection: React.FC<Props> = ({
  isError,
  isLoading,
  gameData={data:[]},
  error,
  onNavigate,
  refetch
}) => {
    
  if (isError) return <ErroSection message={error.message} onRetry={refetch}/>;
  return (
    <section className="flex flex-col gap-12">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-3xl gap-2 font-semibold ">Trending <span className="">Games</span></h1>
        <Link to="/games" className="flex gap-2 font-medium text-sm hover:text-muted-foreground duration-300 transition justify-center items-center">View all games <ArrowRight size={18}/></Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <GameSkeleton key={idx} />
            ))
        ) : (
          gameData.data?.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onClick={() => onNavigate(game.id)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default GameSection;