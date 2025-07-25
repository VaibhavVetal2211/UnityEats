import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { FoodItem } from "@/types/food";
import { FoodImage } from "./food/FoodImage";
import { FoodDetails } from "./food/FoodDetails";

interface FoodListingProps extends FoodItem {
  distance?: string;
  postedAt?: string;
}

export const FoodListing = ({
  id,
  title,
  description,
  location,
  expiresIn,
  type,
  dietary,
  image,
  distance,
  portions,
  spiceLevel,
  mealType,
  preparationTime,
  region,
  state,
  servingTemperature,
  nutritionalInfo,
  rating,
  reviews,
  bestTimeToEat
}: FoodListingProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href + `/claim/${id}`);
    toast.success("Link copied to clipboard!");
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-up group">
      <FoodImage
        image={image}
        title={title}
        region={region}
        dietary={dietary}
        spiceLevel={spiceLevel}
        state={state}
        rating={rating}
        reviews={reviews}
      />
      
      <div className="px-4 pt-2 flex justify-end gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Share</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleFavorite}
              className={isFavorite ? "text-red-500" : ""}
            >
              <Heart className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {isFavorite ? "Remove from favorites" : "Add to favorites"}
          </TooltipContent>
        </Tooltip>
      </div>

      <FoodDetails
        id={id}
        title={title}
        description={description}
        location={location}
        distance={distance}
        expiresIn={expiresIn}
        portions={portions}
        mealType={mealType}
        preparationTime={preparationTime}
        servingTemperature={servingTemperature}
        bestTimeToEat={bestTimeToEat}
        showFullDescription={showFullDescription}
        onToggleDescription={() => setShowFullDescription(!showFullDescription)}
      />
    </Card>
  );
};