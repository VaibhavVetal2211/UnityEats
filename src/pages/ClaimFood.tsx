import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

const ClaimFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [food, setFood] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [imageError, setImageError] = useState(false);

  const fallbackImage = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";

  const getImageUrl = (img: string) => {
    if (!img) return fallbackImage;
    if (img.startsWith('http')) return img;
    if (img.startsWith('/uploads')) {
      const apiUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
      return `${apiUrl}${img}`;
    }
    return img;
  };

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/food/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFood(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleClaim = async () => {
    if (!id) return;
    setClaiming(true);
    try {
      const res = await fetch("/api/claim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(localStorage.getItem("token") && { "Authorization": `Bearer ${localStorage.getItem("token")}` })
        },
        body: JSON.stringify({ foodListingId: id }),
      });
      if (res.ok) {
        const claim = await res.json();
        toast({
          title: "Food Claimed Successfully",
          description: "Proceeding to checkout...",
        });
        navigate(`/checkout/${claim._id}`);
      } else {
        // Provide more specific feedback based on server message/status
        const data = await res.json().catch(() => ({}));
        const serverMessage = data?.message || "Failed to claim food.";
        let title = "Error";
        if (res.status === 400 && /not available/i.test(serverMessage)) {
          title = "Already Claimed";
        } else if (res.status === 403 && /own donation/i.test(serverMessage)) {
          title = "Not Allowed";
        } else if (res.status === 401) {
          title = "Authentication Required";
        }
        toast({
          title,
          description: serverMessage,
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to claim food.",
        variant: "destructive",
      });
    } finally {
      setClaiming(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!food) {
    return <div className="container mx-auto px-4 py-8">Food not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Claim Food Item</h1>
        <div className="space-y-4">
          <img
            src={imageError ? fallbackImage : getImageUrl(food.image)}
            alt={food.title}
            className="w-full h-64 object-cover rounded mb-4"
            onError={() => setImageError(true)}
            loading="lazy"
          />
          <div className="flex justify-between items-center">
            <span className="font-medium">Item:</span>
            <span>{food.title}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Location:</span>
            <span>{food.location}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Description:</span>
            <span>{food.description}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Portions:</span>
            <span>{food.portions || '-'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Dietary:</span>
            <span>{food.dietary || '-'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Region:</span>
            <span>{food.region || '-'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Expiration:</span>
            <span>{food.expiration ? new Date(food.expiration).toLocaleString() : '-'}</span>
          </div>
          <Button onClick={handleClaim} className="w-full mt-6" disabled={claiming}>
            {claiming ? "Claiming..." : "Confirm Claim"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ClaimFood;