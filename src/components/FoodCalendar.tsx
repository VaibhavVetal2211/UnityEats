import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Clock, Utensils } from "lucide-react";
import type { FoodItem } from "@/types/food";

export const FoodCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [availableDishes, setAvailableDishes] = useState<FoodItem[]>([]);

  useEffect(() => {
    fetch("/api/food", {
      headers: {
        ...(localStorage.getItem("token") && { "Authorization": `Bearer ${localStorage.getItem("token")}` })
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setAvailableDishes(data);
      });
  }, []);

  const getAvailableDishes = (date: Date) => {
    // Optionally, filter by date if your backend supports it
    const dayOfWeek = date.getDay();
    return availableDishes.slice(dayOfWeek, dayOfWeek + 3);
  };

  const handleReserve = (dishId: string) => {
    toast.success("Dish reserved successfully!");
  };

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Food Availability Calendar</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border bg-white"
        />
        <div>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            Available on {date?.toLocaleDateString()}
          </h3>
          <ul className="space-y-4">
            {date && getAvailableDishes(date).map((dish) => (
              <li key={dish.id} className="flex items-center gap-4 bg-white p-3 rounded-lg shadow-sm">
                <img
                  src={dish.image}
                  alt={dish.title}
                  className="w-20 h-20 rounded-md object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">{dish.title}</p>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="outline">{dish.dietary}</Badge>
                    <Badge variant="outline">{dish.spiceLevel}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {dish.portions} portions available
                  </p>
                </div>
                <Button 
                  size="sm"
                  onClick={() => handleReserve(dish.id)}
                >
                  Reserve
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};