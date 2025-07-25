import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Plus } from "lucide-react";
import { useState } from "react";
import { indianDishes } from "@/data/indianDishes";
import { toast } from "sonner";

export const MealPlanning = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedMeals, setSelectedMeals] = useState<Record<string, string[]>>({});

  const handleAddMeal = (date: Date, dish: string) => {
    const dateStr = date.toISOString().split('T')[0];
    setSelectedMeals(prev => ({
      ...prev,
      [dateStr]: [...(prev[dateStr] || []), dish]
    }));
    toast.success("Meal added to plan!");
  };

  const getRecommendedDishes = () => {
    return indianDishes.slice(0, 5);
  };

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6">
        <CalendarDays className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Meal Planning</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
          {date && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">
                Planned Meals for {date.toLocaleDateString()}
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedMeals[date.toISOString().split('T')[0]]?.map((meal, index) => (
                  <Badge key={index} variant="secondary">
                    {meal}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <h3 className="font-semibold mb-4">Recommended Dishes</h3>
          <div className="space-y-4">
            {getRecommendedDishes().map((dish) => (
              <div
                key={dish.id}
                className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={dish.image}
                    alt={dish.title}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-medium">{dish.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {dish.mealType} • {dish.preparationTime}
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => date && handleAddMeal(date, dish.title)}
                  disabled={!date}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};