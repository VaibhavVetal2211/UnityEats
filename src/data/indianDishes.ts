import { northIndianDishes } from "./dishes/northIndian";
import { southIndianDishes } from "./dishes/southIndian";
import { eastIndianDishes } from "./dishes/eastIndian";
import { westIndianDishes } from "./dishes/westIndian";
import type { FoodItem } from "@/types/food";

export const indianDishes: FoodItem[] = [
  ...northIndianDishes,
  ...southIndianDishes,
  ...eastIndianDishes,
  ...westIndianDishes,
];

export const recentSearches = [
  "Butter Chicken",
  "Masala Dosa",
  "Biryani",
  "Vada Pav",
  "Dhokla",
  "Fish Curry",
  "Dal Makhani",
  "Rogan Josh",
  "Litti Chokha",
  "Hyderabadi Biryani"
];