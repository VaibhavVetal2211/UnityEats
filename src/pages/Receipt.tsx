import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Receipt = () => {
  const { id } = useParams();
  const [claim, setClaim] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/claim/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setClaim(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!claim) {
    return <div className="container mx-auto px-4 py-8">Order not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Order Confirmation</h1>
          <p className="text-muted-foreground">Order #{id}</p>
        </div>
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="font-medium">Item:</span>
            <span>{claim.foodListing?.title}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Pickup Location:</span>
            <span>{claim.foodListing?.location}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Pickup Time:</span>
            <span>{claim.pickupTime ? new Date(claim.pickupTime).toLocaleString() : "-"}</span>
          </div>
        </div>
        <div className="border-t pt-4">
          <p className="text-center text-muted-foreground mb-6">
            Please show this confirmation at pickup
          </p>
          <Link to="/">
            <Button className="w-full">Return Home</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Receipt;