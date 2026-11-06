import HeroSection from "@/components/home/HeroSection";
import { API_BASE_KEY, API_HEADER } from "@/lib/constants";
import axios from "axios";
import { useNavigate } from "react-router";
import { useQueries } from "@tanstack/react-query";
import StaticalSection from "@/components/home/StaticalSection";
import { Card } from "@/components/ui/card";
import GameSection from "@/components/home/GameSection";

const Home = () => {
  const navigate = useNavigate();
  const fetchGamesdata = async () => {
    const response = await axios.get(`${API_BASE_KEY}/games`, {
      headers: {
        "X-API-KEY": API_HEADER,
      },
    });
    return response.data;
  };
  const fetchMetadata = async () => {
    const response = await axios.get(`${API_BASE_KEY}/games/metadata`, {
      headers: {
        "X-API-KEY": API_HEADER,
      },
    });

    return response.data;
  };
  const [gamesData, metadata] = useQueries({
    queries: [
      {
        queryKey: ["games"],
        queryFn: fetchGamesdata,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retryOnMount: false,
      },
      {
        queryKey: ["metadata"],
        queryFn: fetchMetadata,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
    ],
  });
  const { data: gameData, isLoading, isError, error, refetch } = gamesData;
  const {
    data: gameMeta,
    isLoading: metaLoading,
    error: metaError,
    refetch: metaRefetch,
  } = metadata;

  return (
    <div className="p-6">
      <HeroSection onNavigate={(pathName) => navigate(pathName)} />
      <GameSection
        gameData={gameData!}
        isLoading={isLoading}
        isError={isError}
        error={error!}
        onNavigate={(id) => navigate(`/games/${id}`)}
        refetch={refetch}
      />
        <Card className="w-full bg-white">
          <div className="w-full flex items-center justify-center text-3xl gap-x-2 font-bold py-4">
            <h1 className="">About</h1>
            <span className="bg-linear-to-r from-blue-400 via-indigo-400 to-violet-500 bg-clip-text text-transparent">
              Games
            </span>
          </div>
          <StaticalSection
            isLoading={metaLoading}
            data={gameMeta}
            error={metaError!}
            refetch={metaRefetch}
          />
        </Card>
    </div>
  );
};

export default Home;
