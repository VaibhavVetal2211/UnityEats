import { useState, useEffect } from "react";
import { FoodListing } from "./FoodListing";
import { SearchFilters } from "./food/SearchFilters";
import { FilterSheet } from "./filters/FilterSheet";
import { MapToggle } from "./MapToggle";
import { FoodCardSkeleton } from "./FoodCardSkeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { recentSearches } from "@/data/indianDishes";
import type { FoodItem } from "@/types/food";

export const AvailableListings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [dietaryFilter, setDietaryFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [cuisineFilter, setCuisineFilter] = useState("all");
  const [showMap, setShowMap] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [foodListings, setFoodListings] = useState<FoodItem[]>([]);

  useEffect(() => {
    setMounted(true);
    setIsLoading(true);
    fetch("/api/food", {
      headers: {
        ...(localStorage.getItem("token") && { "Authorization": `Bearer ${localStorage.getItem("token")}` })
      }
    })
      .then((res) => res.json())
      .then((data) => {
        // Map _id to id for each listing
        setFoodListings(data.map((item: any) => ({ ...item, id: item._id })));
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const filteredListings = foodListings.filter((listing: FoodItem) => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === "" || listing.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesDietary = dietaryFilter === "all" || listing.dietary === dietaryFilter;
    const matchesRegion = regionFilter === "all" || listing.region === regionFilter;
    const matchesCuisine = cuisineFilter === "all" || listing.state === cuisineFilter;
    return matchesSearch && matchesLocation && matchesDietary && matchesRegion && matchesCuisine;
  });

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 space-y-4">
          <h2 className="text-3xl font-bold text-primary mb-8">Available Indian Food</h2>
          <SearchFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            recentSearches={recentSearches}
          />
          <div className="flex gap-2">
            <Select
              value={dietaryFilter}
              onValueChange={setDietaryFilter}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Dietary Preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Foods</SelectItem>
                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
              </SelectContent>
            </Select>
            <MapToggle showMap={showMap} onToggle={() => setShowMap(!showMap)} />
            <FilterSheet
              cuisineFilter={cuisineFilter}
              setCuisineFilter={setCuisineFilter}
              regionFilter={regionFilter}
              setRegionFilter={setRegionFilter}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <FoodCardSkeleton key={index} />
            ))
          ) : (
            filteredListings.map((listing) => (
              <FoodListing
                key={listing.id}
                {...listing}
                distance="2.5 miles"
                postedAt="2 hours ago"
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};