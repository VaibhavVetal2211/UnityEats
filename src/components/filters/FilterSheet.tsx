import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterSheetProps {
  cuisineFilter: string;
  setCuisineFilter: (value: string) => void;
  regionFilter: string;
  setRegionFilter: (value: string) => void;
}

export const FilterSheet = ({
  cuisineFilter,
  setCuisineFilter,
  regionFilter,
  setRegionFilter,
}: FilterSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Indian Cuisine Filters</SheetTitle>
          <SheetDescription>
            Explore authentic Indian cuisine from different regions
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Region</label>
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="north">North Indian</SelectItem>
                <SelectItem value="south">South Indian</SelectItem>
                <SelectItem value="east">East Indian</SelectItem>
                <SelectItem value="west">West Indian</SelectItem>
                <SelectItem value="central">Central Indian</SelectItem>
                <SelectItem value="north-east">North-East Indian</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">State Cuisine</label>
            <Select value={cuisineFilter} onValueChange={setCuisineFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select state cuisine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                <SelectItem value="punjab">Punjabi</SelectItem>
                <SelectItem value="gujarat">Gujarati</SelectItem>
                <SelectItem value="west-bengal">Bengali</SelectItem>
                <SelectItem value="kerala">Kerala</SelectItem>
                <SelectItem value="rajasthan">Rajasthani</SelectItem>
                <SelectItem value="maharashtra">Maharashtrian</SelectItem>
                <SelectItem value="telangana">Hyderabadi</SelectItem>
                <SelectItem value="tamil-nadu">Tamil</SelectItem>
                <SelectItem value="karnataka">Karnataka</SelectItem>
                <SelectItem value="bihar">Bihari</SelectItem>
                <SelectItem value="uttar-pradesh">UP Style</SelectItem>
                <SelectItem value="goa">Goan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};