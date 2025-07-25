import { Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface MapToggleProps {
  showMap: boolean;
  onToggle: () => void;
}

export const MapToggle = ({ showMap, onToggle }: MapToggleProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={onToggle}
          className={showMap ? "bg-primary text-primary-foreground" : ""}
        >
          <Map className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{showMap ? "Hide map view" : "Show map view"}</p>
      </TooltipContent>
    </Tooltip>
  );
};