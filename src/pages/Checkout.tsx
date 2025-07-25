import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [claim, setClaim] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pickupTime, setPickupTime] = useState("");

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

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setSubmitting(true);
    try {
      // Optionally, update claim status and store pickup info
      const res = await fetch(`/api/claim/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(localStorage.getItem("token") && { "Authorization": `Bearer ${localStorage.getItem("token")}` })
        },
        body: JSON.stringify({
          status: "completed",
          fullName,
          email,
          phone,
          pickupTime,
        }),
      });
      if (res.ok) {
        toast({
          title: "Order Confirmed",
          description: "Your order has been placed successfully!",
        });
        navigate(`/receipt/${id}`);
      } else {
        toast({
          title: "Error",
          description: "Failed to confirm order.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to confirm order.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!claim) {
    return <div className="container mx-auto px-4 py-8">Claim not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <span className="font-medium">Item:</span>
            <span>{claim.foodListing?.title}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Location:</span>
            <span>{claim.foodListing?.location}</span>
          </div>
        </div>
        <form onSubmit={handleCheckout} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <Input required placeholder="John Doe" value={fullName} onChange={e => setFullName(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input type="email" required placeholder="john@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <Input type="tel" required placeholder="(555) 555-5555" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Pickup Time</label>
              <Input type="datetime-local" required value={pickupTime} onChange={e => setPickupTime(e.target.value)} />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Confirming..." : "Confirm Order"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Checkout;