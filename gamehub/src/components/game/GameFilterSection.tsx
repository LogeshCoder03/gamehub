import {
  Search,
  Download,
  Star,
  Building2,
  CalendarDays,
  Shapes,
  RotateCcw,
  SlidersHorizontal,
  LucideIceCreamBowl,
} from "lucide-react";
import type { FilterProps } from "@/pages/games/Games";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
const downloardOptions = [
  {
    label: "All downloards",
    value: "all",
  },
  {
    label: "100k",
    value: "100000",
  },
  {
    label: "500k",
    value: "50000",
  },
  {
    label: "1m",
    value: "1000000",
  },
  {
    label: "10m",
    value: "10000000",
  },
  {
    label: "50m+",
    value: "50000000",
  },
];

const ratingsOptions = [
  {
    label: "Any rating",
    value: "all",
  },
  {
    label: "4.5 and above",
    value: "4.5",
  },
  {
    label: "4.0 and above",
    value: "4",
  },
  {
    label: "3.5 and above",
    value: "3.5",
  },
  {
    label: "3.0 and above",
    value: "3",
  },
];

const launchDateOptions = [
  {
    label: "Any",
    value: "all",
  },
  {
    label: "Last 30 days",
    value: "30days",
  },
  {
    label: "Last 3 months",
    value: "90days",
  },
  {
    label: "This year",
    value: "year",
  },
  {
    label: "2025",
    value: "2025",
  },
  {
    label: "2024",
    value: "2024",
  },
];

const popularities=[
    {
        label:"Extreme",
        value:"extreme"
    },
    {
        label:"High",
        value:"high"
    },
    {
        label:"Medium",
        value:"medium"
    },
    {
        label:"Low",
        value:"low"
    },
]

type Props = {
  filters: FilterProps;
  onFiltersChange: (key: keyof FilterProps, value: string) => void;
  resetFilter: () => void;
};

function GameFilterSection({ onFiltersChange, resetFilter, filters }: Props) {


  const FilterField = ({
    label,
    icon: Icon,
    children,
  }: {
    label: string;
    icon: typeof LucideIceCreamBowl;
    children: React.ReactNode;
  }) => (
    <div className="min-w-0 space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium">
        <Icon size={16} className="text-muted-foreground" />
        {label}
      </label>
      {children}
    </div>
  );

  return (
    <section className="rounded-2xl border bg-card p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <SlidersHorizontal size={19} className="text-primary" />
            Discover Games
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Find your next favorite game.
          </p>
        </div>

        <Button variant="link" onClick={resetFilter}>
          <RotateCcw size={15} />
          Reset
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search
          size={18}
          className="absolute left-3 top-1/2
            -translate-y-1/2 text-muted-foreground"
        />

        <Input
          value={filters.search}
          onChange={(e) => onFiltersChange("search", e.target.value)}
          placeholder="Search games by title..."
          className="pl-10 h-11"
        />
      </div>

      {/* Filters */}
      <div
        className="grid grid-cols-1 gap-4
        sm:grid-cols-2 lg:grid-cols-3"
      >
        <FilterField label="Downloads" icon={Download}>
          <Select
            items={downloardOptions}
            value={filters.downloads}
            onValueChange={(value) => onFiltersChange("downloads", value!)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a downloards" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Downloards</SelectLabel>
                {downloardOptions.map((option) => (
                  <SelectItem value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </FilterField>

        <FilterField label="Rating" icon={Star}>
          <Select
            value={filters.ratings}
            onValueChange={(value) => onFiltersChange("ratings", value!)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Ratings" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Ratings</SelectLabel>
                {ratingsOptions.map((option) => (
                  <SelectItem value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </FilterField>

        <FilterField label="Popularity" icon={Building2}>
          <Select
            value={filters.popularity}
            onValueChange={(value) => onFiltersChange("popularity", value!)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Popularity" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Companies</SelectLabel>
                {popularities.map((popularity,idx) => (
                  <SelectItem key={idx} value={popularity.value}>
                    {popularity.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </FilterField>

        <FilterField label="Launch Date" icon={CalendarDays}>
          <Select
            value={filters.launchDate}
            onValueChange={(value) => onFiltersChange("launchDate", value!)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Launch Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Launched At</SelectLabel>

                {launchDateOptions.map((date, idx) => (
                  <SelectItem key={idx} value={date.value}>
                    {date.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </FilterField>

        <FilterField label="Category" icon={Shapes}>
          <Select
            value={filters.type}
            onValueChange={(value) => onFiltersChange("type", value!)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="indoor">Indoor</SelectItem>
                  <SelectItem value="outdoor">Outdoor</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FilterField>
      </div>

      <div className="mt-5 flex justify-end border-t pt-4">
        <button
          onClick={resetFilter}
          className="rounded-xl bg-primary px-5 py-2.5
            text-sm font-semibold text-primary-foreground
            hover:opacity-90"
        >
          Clear Filters
        </button>
      </div>
    </section>
  );
}

export default GameFilterSection;
