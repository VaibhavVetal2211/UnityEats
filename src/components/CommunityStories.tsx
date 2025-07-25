import { Card } from "@/components/ui/card";
import { MessageSquare, ThumbsUp, Heart } from "lucide-react";

export const CommunityStories = () => {
  const stories = [
    {
      avatar: "https://i.pravatar.cc/100?img=1",
      name: "Sarah Johnson",
      role: "Regular Donor",
      story: "I've been donating excess food from my restaurant for 6 months now. It's amazing to see how many people we've helped!",
      likes: 124,
      comments: 18
    },
    {
      avatar: "https://i.pravatar.cc/100?img=2",
      name: "Michael Chen",
      role: "Volunteer",
      story: "Being a part of this community has opened my eyes to how we can make a real difference in fighting food waste.",
      likes: 89,
      comments: 12
    },
    {
      avatar: "https://i.pravatar.cc/100?img=3",
      name: "Emily Rodriguez",
      role: "Food Recipient",
      story: "This platform has been a blessing for my family. We're grateful for all the generous donors in our community.",
      likes: 156,
      comments: 24
    }
  ];

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Community Stories</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={story.avatar}
                alt={story.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{story.name}</h3>
                <p className="text-sm text-muted-foreground">{story.role}</p>
              </div>
            </div>
            <p className="text-sm mb-4">{story.story}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <button className="flex items-center gap-1 hover:text-primary transition-colors">
                <Heart className="h-4 w-4" />
                {story.likes}
              </button>
              <button className="flex items-center gap-1 hover:text-primary transition-colors">
                <MessageSquare className="h-4 w-4" />
                {story.comments}
              </button>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
};