import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Timer, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface FoodDetailsProps {
  id: string;
  title: string;
  description: string;
  location: string;
  distance?: string;
  expiresIn: string;
  portions?: number;
  mealType: string;
  preparationTime?: string;
  servingTemperature?: string;
  bestTimeToEat?: string;
  showFullDescription: boolean;
  onToggleDescription: () => void;
}

export const FoodDetails = ({
  id,
  title,
  description,
  location,
  distance,
  expiresIn,
  portions,
  mealType,
  preparationTime,
  servingTemperature,
  bestTimeToEat,
  showFullDescription,
  onToggleDescription
}: FoodDetailsProps) => {
  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="flex gap-2 mt-1">
        <Badge variant="outline">{mealType}</Badge>
        {preparationTime && (
          <Badge variant="outline">{preparationTime}</Badge>
        )}
        {servingTemperature && (
          <Badge variant="outline">{servingTemperature}</Badge>
        )}
      </div>
      
      <div className="relative mt-2">
        <p className={`text-muted-foreground mb-4 ${!showFullDescription && "line-clamp-2"}`}>
          {description}
        </p>
        {description.length > 100 && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute -bottom-2 right-0 text-xs"
            onClick={onToggleDescription}
          >
            {showFullDescription ? "Show less" : "Read more"}
          </Button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          {location}
          {distance && <span className="text-xs">({distance})</span>}
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {expiresIn}
        </div>
        {portions && (
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {portions} portions
          </div>
        )}
        {bestTimeToEat && (
          <div className="flex items-center gap-1">
            <Timer className="h-4 w-4" />
            Best time: {bestTimeToEat}
          </div>
        )}
      </div>

      <Link to={`/claim/${id}`}>
        <Button className="w-full bg-primary hover:bg-primary/90">
          Claim Food
        </Button>
      </Link>
    </div>
  );
};