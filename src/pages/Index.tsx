import { Hero } from "@/components/Hero";
import { AvailableListings } from "@/components/AvailableListings";
import { FoodCalendar } from "@/components/FoodCalendar";
import { CommunityStories } from "@/components/CommunityStories";
import { SafetyGuidelines } from "@/components/SafetyGuidelines";
import { RewardsSection } from "@/components/RewardsSection";
import { RecipeSharing } from "@/components/RecipeSharing";
import { MealPlanning } from "@/components/MealPlanning";
import { DietaryQuiz } from "@/components/DietaryQuiz";
import { CookingTips } from "@/components/CookingTips";
import { SeasonalGuides } from "@/components/SeasonalGuides";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <div className="container mx-auto px-4 py-12 space-y-12">
        <DietaryQuiz />
        <AvailableListings />
        <MealPlanning />
        <FoodCalendar />
        <RecipeSharing />
        <CookingTips />
        <SeasonalGuides />
        <SafetyGuidelines />
        <RewardsSection />
        <CommunityStories />
      </div>
    </div>
  );
};

export default Index;