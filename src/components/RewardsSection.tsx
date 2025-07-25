import { Card } from "@/components/ui/card";
import { Award, Gift, Star, Trophy, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export const RewardsSection = () => {
  const [currentPoints] = useState(350);
  
  const rewards = [
    {
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      points: 100,
      title: "Bronze Donor",
      perks: "Special badge on profile",
      progress: Math.min((currentPoints / 100) * 100, 100)
    },
    {
      icon: <Award className="h-6 w-6 text-gray-400" />,
      points: 500,
      title: "Silver Supporter",
      perks: "Priority listings + Bronze perks",
      progress: Math.min((currentPoints / 500) * 100, 100)
    },
    {
      icon: <Trophy className="h-6 w-6 text-yellow-600" />,
      points: 1000,
      title: "Gold Champion",
      perks: "Featured donor status + Silver perks",
      progress: Math.min((currentPoints / 1000) * 100, 100)
    },
    {
      icon: <Gift className="h-6 w-6 text-primary" />,
      points: 2000,
      title: "Platinum Hero",
      perks: "Exclusive community events + Gold perks",
      progress: Math.min((currentPoints / 2000) * 100, 100)
    }
  ];

  const handleClaimReward = (points: number) => {
    if (currentPoints >= points) {
      toast.success("Reward claimed successfully!");
    } else {
      toast.error("Not enough points to claim this reward");
    }
  };

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Rewards Program</h2>
      </div>
      
      <div className="text-center mb-8">
        <p className="text-4xl font-bold text-primary">{currentPoints}</p>
        <p className="text-sm text-muted-foreground">Current Points</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {rewards.map((reward, index) => (
          <div 
            key={index} 
            className="text-center space-y-4 p-4 rounded-lg bg-white hover:shadow-md transition-all duration-300"
          >
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              {reward.icon}
            </div>
            <div>
              <h3 className="font-semibold">{reward.title}</h3>
              <p className="text-sm font-medium text-primary">{reward.points} Points</p>
              <p className="text-sm text-muted-foreground mt-2">{reward.perks}</p>
            </div>
            <Progress value={reward.progress} className="h-2" />
            <Button 
              variant={currentPoints >= reward.points ? "default" : "outline"}
              size="sm"
              className="w-full"
              onClick={() => handleClaimReward(reward.points)}
              disabled={currentPoints < reward.points}
            >
              {currentPoints >= reward.points ? "Claim Reward" : `${reward.points - currentPoints} points needed`}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};