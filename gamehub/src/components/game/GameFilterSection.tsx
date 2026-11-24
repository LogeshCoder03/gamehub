import {
  Search, Download, Star, Building2,
  CalendarDays, Shapes, RotateCcw, SlidersHorizontal,
  LucideIceCreamBowl
} from "lucide-react";
import type { FilterProps } from "@/pages/games/Games";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
const downloardOptions=[
    {
        label:"All downloards",
        value:'all'
    },
    {
        label:"100k",
        value:'100k'
    },
    {
        label:"500k",
        value:'500k'
    },
    {
        label:"1m",
        value:'1m'
    },
    {
        label:"10m",
        value:'10m'
    },
    {
        label:"50m",
        value:'50m'
    },
]

type Props={
  filters:FilterProps
    onFiltersChange:(key:keyof FilterProps,value:string)=>void
    resetFilter:()=>void
}

 function GameFilterSection({
  onFiltersChange,
  resetFilter,
  filters
}:Props) {

  const selectClass = `
    w-full rounded-xl border border-border
    bg-background px-3 py-3 text-sm
    outline-none transition
    focus:border-primary focus:ring-2
    focus:ring-primary/20
  `;

  const FilterField = ({ label, icon: Icon, children }:{label:string,icon:typeof LucideIceCreamBowl,children:React.ReactNode}) => (
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

        <Button
        variant="link"
          onClick={resetFilter}
        >
          <RotateCcw size={15} />
          Reset
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={18}
          className="absolute left-3 top-1/2
            -translate-y-1/2 text-muted-foreground" />

        <Input
          value={filters.search}
          onChange={e => onFiltersChange("search", e.target.value)}
          placeholder="Search games by title..."
        className="pl-10 h-11"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-4
        sm:grid-cols-2 lg:grid-cols-3">

        <FilterField label="Downloads" icon={Download}>
          <Select
          items={downloardOptions}
            value={filters.downloads}
            onValueChange={value=>onFiltersChange("downloads", value!)}
            // onChange={}
          >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a downloards"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup >
                    <SelectLabel>Downloards</SelectLabel>
                    {downloardOptions.map(
                        (option)=><SelectItem value={option.value}>
                            {option.label}
                        </SelectItem>
                    )}
                </SelectGroup>
            </SelectContent>
          </Select>
        </FilterField>

        <FilterField label="Rating" icon={Star}>
          <select
            className={selectClass}
            value={filters.rating}
            onChange={e => onFiltersChange("rating", e.target.value)}
          >
            <option value="all">Any rating</option>
            <option value="4.5">4.5 and above</option>
            <option value="4">4.0 and above</option>
            <option value="3.5">3.5 and above</option>
            <option value="3">3.0 and above</option>
          </select>
        </FilterField>

        <FilterField label="Company" icon={Building2}>
          <select
            className={selectClass}
            value={filters.company}
            onChange={e => onFiltersChange("company", e.target.value)}
          >
            <option value="all">All companies</option>
            {[{id:1,name:"A"}].map(company => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </FilterField>

        <FilterField label="Launch Date" icon={CalendarDays}>
          <select
            className={selectClass}
            value={filters.launchDate}
            onChange={e => onFiltersChange("launchDate", e.target.value)}
          >
            <option value="all">Any time</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 3 months</option>
            <option value="year">This year</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </FilterField>

        <FilterField label="Category" icon={Shapes}>
          <select
            className={selectClass}
            value={filters.category}
            onChange={e => onFiltersChange("category", e.target.value)}
          >
            <option value="all">All categories</option>
            {[{id:1,name:"A"}].map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
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

export default GameFilterSection