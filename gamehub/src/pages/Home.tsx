import HeroSection from "@/components/home/HeroSection";
import { API_BASE_KEY, API_HEADER } from "@/lib/constants";
import axios from "axios";
import { useNavigate } from "react-router";
import { useQueries } from "@tanstack/react-query";
import StaticalSection from "@/components/home/StaticalSection";
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
    <div className="p-6 space-y-16">
      <HeroSection onNavigate={(pathName) => navigate(pathName)} />
      <GameSection
        gameData={gameData!}
        isLoading={isLoading}
        isError={isError}
        error={error!}
        onNavigate={(id) => navigate(`/games/${id}`)}
        refetch={refetch}
      />
      <StaticalSection
        isLoading={metaLoading}
        data={gameMeta}
        error={metaError!}
        refetch={metaRefetch}
      />
      {/* <GamesCountStats /> */}
    </div>
  );
};

export default Home;

// import { Gamepad2, Home as H, Trees, Wifi } from "lucide-react";

// function StatCard({ Icon, label, count, tint, iconColor }) {
//   return (
//     <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-4">
//       <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${tint}`}>
//         <Icon size={20} color={iconColor} />
//       </div>
//       <p className="text-2xl font-semibold text-gray-900">{count}</p>
//       <p className="text-sm text-gray-500">{label}</p>
//     </div>
//   );
// }

// export  function GamesCountStats({ total=10, indoor=20, outdoor=30, online=40 }) {
//   return (
//     <section className="bg-gray-100 rounded-2xl p-4 mt-4 w-full max-w-md">
//       <p className="text-sm text-gray-500 mb-3">Your games</p>

//       <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-3">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-sm text-gray-500">Total games</p>
//             <p className="text-4xl font-semibold text-gray-900">{total}</p>
//           </div>
//           <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
//             <Gamepad2 size={24} color="#2563eb" />
//           </div>
//         </div>

//         <div className="flex gap-0.5 h-2 rounded-full overflow-hidden mt-4">
//           <div style={{ flex: indoor }} className="bg-green-500" />
//           <div style={{ flex: outdoor }} className="bg-amber-500" />
//           <div style={{ flex: online }} className="bg-blue-500" />
//         </div>
//       </div>

//       <div className="flex gap-3 mb-3">
//         <StatCard Icon={H} label="Indoor" count={indoor} tint="bg-green-100" iconColor="#16a34a" />
//         <StatCard Icon={Trees} label="Outdoor" count={outdoor} tint="bg-amber-100" iconColor="#d97706" />
//       </div>

//       <div className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center">
//         <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center mr-3">
//           <Wifi size={20} color="#2563eb" />
//         </div>
//         <p className="flex-1 text-sm text-gray-500">Online</p>
//         <p className="text-2xl font-semibold text-gray-900">{online}</p>
//       </div>
//     </section>
//   );
// }