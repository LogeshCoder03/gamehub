import React from "react";
import ErroSection from "@/components/ErrorFallback";
import type { AxiosError } from "axios";
import type { GameDataType } from "@/types/gameTypes";
import GameCard, { GameSkeleton } from "./GameCard";

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
    <div className="flex justify-center w-full flex-col">
      <div className="w-full flex items-center justify-center text-3xl gap-x-2 font-bold py-4">
        <h1 className="">Trending</h1>
        <span className="bg-linear-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Games
        </span>
      </div>
      <div className="px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
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
    </div>
  );
};

export default GameSection;
