import { Card } from "@/components/ui/card";
import { Shield, Clock, Thermometer, AlertTriangle } from "lucide-react";

export const SafetyGuidelines = () => {
  const guidelines = [
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Food Safety",
      description: "Ensure food is properly packaged and sealed"
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Time Management",
      description: "Pick up food within the specified timeframe"
    },
    {
      icon: <Thermometer className="h-6 w-6 text-primary" />,
      title: "Temperature Control",
      description: "Maintain proper temperature during transport"
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-primary" />,
      title: "Allergen Awareness",
      description: "Check and declare all potential allergens"
    }
  ];

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Food Safety Guidelines</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {guidelines.map((guideline, index) => (
          <div key={index} className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              {guideline.icon}
            </div>
            <h3 className="font-semibold">{guideline.title}</h3>
            <p className="text-sm text-muted-foreground">{guideline.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};