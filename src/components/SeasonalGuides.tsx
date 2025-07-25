import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Calendar } from "lucide-react";

export const SeasonalGuides = () => {
  const seasonalFoods = [
    {
      season: "Summer",
      foods: ["Mangoes", "Watermelon", "Green Leafy Vegetables", "Cucumber"],
      benefits: "Rich in water content and vitamins",
      color: "text-orange-500"
    },
    {
      season: "Monsoon",
      foods: ["Sweet Potato", "Corn", "Mushrooms", "Ginger"],
      benefits: "Immunity boosting properties",
      color: "text-blue-500"
    },
    {
      season: "Winter",
      foods: ["Carrots", "Spinach", "Mustard Greens", "Sweet Potatoes"],
      benefits: "High in nutrients and warming properties",
      color: "text-indigo-500"
    }
  ];

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Seasonal Food Guide</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {seasonalFoods.map((season, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-2 mb-4">
              <Leaf className={`h-5 w-5 ${season.color}`} />
              <h3 className="font-semibold">{season.season}</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Seasonal Foods:</p>
                <div className="flex flex-wrap gap-2">
                  {season.foods.map((food, idx) => (
                    <Badge key={idx} variant="secondary">
                      {food}
                    </Badge>
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Benefits: {season.benefits}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};