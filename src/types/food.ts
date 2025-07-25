export type SpiceLevel = "mild" | "medium" | "high";
export type DietaryType = "vegetarian" | "non-vegetarian";
export type MealType = "breakfast" | "lunch" | "dinner" | "snacks" | "dessert";
export type Region = "north" | "south" | "east" | "west" | "central" | "north-east";
export type CookingTime = "quick" | "medium" | "long";
export type ServingTemperature = "hot" | "cold" | "room-temperature";
export type Cuisine = 
  | "punjabi" 
  | "gujarati" 
  | "bengali" 
  | "kerala" 
  | "rajasthani" 
  | "maharashtrian" 
  | "hyderabadi" 
  | "tamil" 
  | "karnataka" 
  | "bihari" 
  | "up-style" 
  | "goan";

export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

export interface FoodItem {
  id: string;
  title: string;
  description: string;
  location: string;
  expiresIn: string;
  type: "perishable" | "non-perishable";
  dietary: DietaryType;
  image: string;
  region: Region;
  state: string;
  spiceLevel: SpiceLevel;
  category: string;
  mealType: MealType;
  portions: number;
  preparationTime: CookingTime;
  ingredients?: string[];
  allergens?: string[];
  cuisine?: Cuisine;
  rating?: number;
  reviews?: number;
  isHalal?: boolean;
  isJain?: boolean;
  servingTemperature?: ServingTemperature;
  bestTimeToEat?: string;
  nutritionalInfo?: NutritionalInfo;
}