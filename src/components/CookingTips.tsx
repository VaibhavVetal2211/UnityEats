import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChefHat, PlayCircle, BookOpen, Clock } from "lucide-react";

export const CookingTips = () => {
  const tips = [
    {
      title: "Perfect Rice Cooking",
      duration: "5 mins",
      type: "Basic",
      description: "Master the art of cooking perfect rice every time",
      icon: <ChefHat className="h-6 w-6 text-primary" />
    },
    {
      title: "Spice Blending",
      duration: "8 mins",
      type: "Intermediate",
      description: "Learn to blend Indian spices for authentic flavors",
      icon: <BookOpen className="h-6 w-6 text-primary" />
    },
    {
      title: "Dough Kneading",
      duration: "6 mins",
      type: "Basic",
      description: "Perfect technique for soft rotis and naans",
      icon: <ChefHat className="h-6 w-6 text-primary" />
    }
  ];

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6">
        <ChefHat className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Cooking Tips & Tutorials</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-primary/10 rounded-full">
                {tip.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{tip.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {tip.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {tip.duration}
                  </span>
                  <span>{tip.type}</span>
                </div>
              </div>
            </div>
            <Button className="w-full mt-4" variant="outline">
              <PlayCircle className="h-4 w-4 mr-2" />
              Watch Tutorial
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};