import React from "react";
import ErroSection from "@/components/ErrorFallback";
import type { AxiosError } from "axios";
import type { GameDataType } from "@/types/gameTypes";
import GameCard, { GameSkeleton } from "../game/GameCard";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

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
  gameData,
  error,
  onNavigate,
  refetch
}) => {
  if (isError) return <ErroSection message={error.message} onRetry={refetch}/>;
  return (
    <section className="flex justify-center w-full flex-col gap-12">
      <div className="w-full flex items-center  justify-between">
        <h1 className="text-3xl gap-2 font-bold">Trending <span className="">Games</span></h1>
        <Button variant="link">View all games <ArrowRight/></Button>
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
