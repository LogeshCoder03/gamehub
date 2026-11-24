import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Download, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { BaseGameType } from "@/types/gameTypes";
import hero from "@/assests/hero.jpg";

type Props = {
  game: BaseGameType;
  onClick: () => void;
};

const GameCard: React.FC<Props> = ({ game, onClick }) => {
  const releaseDate = game?.development_details?.published_at
    ? new Date(game.development_details.published_at).toLocaleDateString("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Unknown date";
  return (
    <Card
      className="w-full max-w-md pt-0 group  transition-all duration-300
      hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="rounded-md rounded-b-none h-56 overflow-hidden relative">
        <img
          src={hero}
          className="h-full w-full object-cover transition-transform
            duration-500 group-hover:scale-105"
        />
        <span
          className="absolute top-3 left-3 rounded-lg bg-black/60 px-3 py-1 text-xs font-medium text-white
          backdrop-blur-md"
        >
          {game?.details?.category}
        </span>
        <span
          className="absolute right-3 top-3 flex items-center
          gap-1 rounded-lg bg-black/60 px-2.5 py-1.5
          text-sm text-white backdrop-blur-md"
        >
          <span className="text-yellow-400">★</span>
          {game?.details?.ratings || "N/A"}
        </span>
      </div>
      <CardHeader>
        <CardTitle>{game.name}</CardTitle>
        <CardDescription>{game.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between border-t pt-3 text-xs text-muted-foreground items-center">
        <div className="flex items-center gap-1.5">
          <Calendar size={14} />
          {releaseDate}
        </div>

        <div className="flex items-center gap-1.5">
          <Download size={14} />
          {1000}
        </div>

        <div className="flex items-center gap-1.5">
          <Star size={14} className="text-yellow-500" />
          {game?.details?.ratings || "N/A"}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onClick}>View <ArrowRight/></Button>
      </CardFooter>
    </Card>
  );
};
export const GameSkeleton = () => {
  return (
    <div className="w-full max-w-md pt-0 rounded-tr-2xl">
      <Skeleton className="w-full h-56 rounded-b-none bg-gray-200" />
      <Skeleton className="mt-2 h-4 w-40 ml-1 bg-gray-200" />
      <Skeleton className="m-2 h-2 w-86 bg-gray-200" />
      <Skeleton className="m-2 h-2 w-86 bg-gray-200" />
      <Skeleton className="m-2 h-2 w-8/12 bg-gray-200" />
      <div className="px-2 my-4 flex justify-between">
        <Skeleton className="h-6 w-40 bg-gray-200" />
        <Skeleton className="w-20 h-6 bg-slate-200" />
      </div>
      <div className="px-2 mt-5 flex justify-between mb-2">
        <Skeleton className="h-8 w-20 bg-gray-200" />
        <Skeleton className="h-6 w-30 bg-gray-200" />
      </div>
    </div>
  );
};

export default GameCard;
