import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Apple, Beef, Leaf, Scale } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const DietaryQuiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    dietType: "",
    spicePreference: "",
    allergies: "",
    mealTime: "",
  });

  const questions = [
    {
      title: "What's your dietary preference?",
      icon: <Leaf className="h-6 w-6 text-primary" />,
      field: "dietType",
      options: ["Vegetarian", "Non-Vegetarian", "Vegan", "No Preference"],
    },
    {
      title: "How spicy do you like your food?",
      icon: <Scale className="h-6 w-6 text-primary" />,
      field: "spicePreference",
      options: ["Mild", "Medium", "Hot", "Extra Hot"],
    },
    {
      title: "Any food allergies?",
      icon: <Apple className="h-6 w-6 text-primary" />,
      field: "allergies",
      options: ["None", "Nuts", "Dairy", "Gluten", "Other"],
    },
    {
      title: "Preferred meal times?",
      icon: <Beef className="h-6 w-6 text-primary" />,
      field: "mealTime",
      options: ["Morning", "Afternoon", "Evening", "No Preference"],
    },
  ];

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[step].field]: value
    }));
    
    if (step < questions.length - 1) {
      setStep(prev => prev + 1);
    } else {
      // In a real app, this would save preferences and update recommendations
      toast.success("Preferences saved! Your recommendations have been updated.");
      setStep(0);
      setAnswers({
        dietType: "",
        spicePreference: "",
        allergies: "",
        mealTime: "",
      });
    }
  };

  const currentQuestion = questions[step];

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6">
        {currentQuestion.icon}
        <h2 className="text-2xl font-bold">Dietary Preferences Quiz</h2>
      </div>

      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">{currentQuestion.title}</h3>
          <div className="space-y-4">
            <RadioGroup
              value={answers[currentQuestion.field as keyof typeof answers]}
              onValueChange={handleAnswer}
            >
              {currentQuestion.options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => setStep(prev => Math.max(0, prev - 1))}
            disabled={step === 0}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Question {step + 1} of {questions.length}
          </span>
          {step < questions.length - 1 && (
            <Button
              onClick={() => setStep(prev => prev + 1)}
              disabled={!answers[questions[step].field as keyof typeof answers]}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};