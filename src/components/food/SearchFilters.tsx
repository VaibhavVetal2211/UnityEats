import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import { SearchSuggestions } from "../SearchSuggestions";

interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  locationFilter: string;
  setLocationFilter: (value: string) => void;
  recentSearches: string[];
}

export const SearchFilters = ({
  searchTerm,
  setSearchTerm,
  locationFilter,
  setLocationFilter,
  recentSearches,
}: SearchFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex-1 min-w-[300px]">
        <div className="relative">
          <Input
            placeholder="Search Indian dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <SearchSuggestions
            searchTerm={searchTerm}
            onSelect={setSearchTerm}
            recentSearches={recentSearches}
          />
        </div>
      </div>
      <div className="flex-1 min-w-[300px]">
        <div className="relative">
          <Input
            placeholder="Filter by location..."
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="pl-10"
          />
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
};