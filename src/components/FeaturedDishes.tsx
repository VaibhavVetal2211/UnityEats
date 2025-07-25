import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Star, Award } from "lucide-react";
import type { FoodItem } from "@/types/food";

export const FeaturedDishes = () => {
  const [featuredDishes, setFeaturedDishes] = useState<FoodItem[]>([]);

  useEffect(() => {
    fetch("/api/food", {
      headers: {
        ...(localStorage.getItem("token") && { "Authorization": `Bearer ${localStorage.getItem("token")}` })
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setFeaturedDishes(data.filter((dish: FoodItem) => dish.rating && dish.rating >= 4.5).slice(0, 5));
      });
  }, []);

  return (
    <div className="py-12 bg-background">
      <div className="container">
        <div className="flex items-center gap-2 mb-8">
          <Award className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Featured Dishes</h2>
        </div>
        <Carousel className="w-full">
          <CarouselContent>
            {featuredDishes.map((dish) => (
              <CarouselItem key={dish.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="p-2">
                  <div className="relative aspect-square rounded-lg overflow-hidden">
                    <img 
                      src={dish.image} 
                      alt={dish.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-full flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span>{dish.rating?.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{dish.title}</h3>
                    <p className="text-sm text-muted-foreground">{dish.region} Indian</p>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};