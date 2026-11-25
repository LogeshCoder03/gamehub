import type { AxiosError } from "axios";
import ErroSection from "../ErrorFallback";
import type { MetadataType } from "@/types/gameTypes";
import { Gamepad2, House, Trees, Wifi } from "lucide-react";
import CountUp from "./CountUp";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";

type Props = {
  isLoading: boolean;
  data: MetadataType;
  error: AxiosError | Error;
  refetch: () => void;
};

const stats: {
  title: string;
  description?: string;
  icon: typeof Wifi;
  id: keyof MetadataType;
  count: number;
}[] = [
  {
    id: "total_games",
    title: "Total Games",
    icon: Gamepad2,
    count: 0,
  },
  {
    id: "indoor_games",
    title: "Indoor Games",
    icon: House,
    count: 0,
  },
  {
    id: "outdoor_games",
    title: "Outdoor",
    icon: Trees,
    count: 0,
  },
  {
    id: "online_games",
    title: "Online Games",
    icon: Wifi,
    count: 0,
  },
];

const StaticalSection = ({ isLoading, data, error, refetch }: Props) => {
  if (error) return <ErroSection message={error.message} onRetry={refetch} />;
  return (
    <section className="flex justify-center w-full flex-col gap-6">
      <h1 className="text-3xl font-semibold">Platform Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {isLoading?
          Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} className="h-40" />
          )):stats.map((stat) => (
          <Card className="gap-2 py-6" key={stat.id}>
            <CardHeader className="gap-2">
              <stat.icon />
              <CardTitle>{stat.title}</CardTitle>
              <CardDescription>{""}</CardDescription>
            </CardHeader>
            <CardContent>
              <CountUp
                className="text-3xl font-semibold"
                target={data?.[stat.id]}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default StaticalSection;