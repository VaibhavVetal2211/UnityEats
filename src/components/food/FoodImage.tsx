import { Badge } from "@/components/ui/badge";
import { FoodItem } from "@/types/food";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

interface FoodImageProps {
  image: string;
  title: string;
  region: string;
  dietary: string;
  spiceLevel: string;
  state: string;
  rating?: number;
  reviews?: number;
}

export const FoodImage = ({
  image,
  title,
  region,
  dietary,
  spiceLevel,
  state,
  rating,
  reviews
}: FoodImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getRegionColor = (region: string) => {
    switch (region) {
      case "north": return "bg-blue-500";
      case "south": return "bg-yellow-500";
      case "east": return "bg-green-500";
      case "west": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const fallbackImage = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";

  // Handle both local uploads and Cloudinary URLs
  const getImageUrl = (img: string) => {
    if (!img) return fallbackImage;
    // If it's a Cloudinary URL (starts with http), return as is
    if (img.startsWith('http')) {
      return img;
    }
    // If it's a local upload path, prepend backend URL
    if (img.startsWith('/uploads')) {
      const apiUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
      return `${apiUrl}${img}`;
    }
    return img;
  };

  return (
    <div className="aspect-video relative overflow-hidden rounded-t-lg">
      {!imageLoaded && !imageError && (
        <Skeleton className="absolute inset-0" />
      )}
      <img 
        src={imageError ? fallbackImage : getImageUrl(image)} 
        alt={title} 
        className={`object-cover w-full h-full transition-all duration-300 group-hover:scale-105 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setImageLoaded(true)}
        onError={() => {
          setImageError(true);
          setImageLoaded(true);
        }}
        loading="lazy"
      />
      <div className="absolute top-2 right-2 flex gap-2">
        <Badge 
          variant="outline" 
          className={`${getRegionColor(region)} text-white backdrop-blur-sm bg-opacity-80`}
        >
          {region} India
        </Badge>
        <Badge
          className={`${
            dietary === "vegetarian" 
              ? "bg-green-600" 
              : "bg-orange-600"
          } backdrop-blur-sm bg-opacity-80`}
        >
          {dietary}
        </Badge>
        <Badge 
          className={`${
            spiceLevel === "high" 
              ? "bg-red-500" 
              : spiceLevel === "medium" 
              ? "bg-yellow-500" 
              : "bg-green-500"
          } backdrop-blur-sm bg-opacity-80`}
        >
          {spiceLevel}
        </Badge>
      </div>
      {(rating && reviews) && (
        <div className="absolute bottom-2 left-2">
          <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
            ⭐ {rating.toFixed(1)} ({reviews} reviews)
          </Badge>
        </div>
      )}
    </div>
  );
};