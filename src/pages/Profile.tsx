import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [donations, setDonations] = useState<any[]>([]);
  const [claims, setClaims] = useState<any[]>([]);
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const userRes = await fetch("/api/auth/profile", { headers });
      const userData = await userRes.json();
      setUser(userData.user);
      setForm({ name: userData.user.name, email: userData.user.email, password: "" });
      // Fetch donations
      const donationsRes = await fetch(`/api/food/user/${userData.user.id}`);
      setDonations(await donationsRes.json());
      // Fetch claims
      const claimsRes = await fetch(`/api/claim/user/${userData.user.id}`, { headers });
      setClaims(await claimsRes.json());
      // Fetch volunteer applications
      const volunteerRes = await fetch(`/api/volunteer/user/${userData.user.id}`, { headers });
      setVolunteers(await volunteerRes.json());
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setEditMode(false);
    setForm({ name: user.name, email: user.email, password: "" });
  };
  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await fetch("/api/auth/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
      setEditMode(false);
      toast({ title: "Profile updated" });
    } else {
      toast({ title: "Failed to update profile", variant: "destructive" });
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      toast({ title: "Logged out" });
    } catch (_) {}
    // Ensure Navbar reflects auth state; navigate home and refresh
    navigate("/");
    setTimeout(() => {
      window.location.reload();
    }, 50);
  };

  if (loading) return <div className="container mx-auto px-4 py-8">Loading...</div>;
  if (!user) return <div className="container mx-auto px-4 py-8">User not found.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto p-6 space-y-6 animate-fade-up">
        <h1 className="text-2xl font-bold mb-4 text-primary">My Profile</h1>
        <div className="flex justify-end">
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
        {editMode ? (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <Input name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password (leave blank to keep current)</label>
              <Input name="password" type="password" value={form.password} onChange={handleChange} />
            </div>
            <div className="flex gap-2">
              <Button type="submit">Save</Button>
              <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
            </div>
          </form>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Full Name:</span>
              <span>{user.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Email:</span>
              <span>{user.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Role:</span>
              <span>{user.role}</span>
            </div>
            <Button className="mt-4" onClick={handleEdit}>Edit Profile</Button>
          </div>
        )}
      </Card>
      <div className="max-w-2xl mx-auto mt-8 space-y-8">
        <Card className="p-6 animate-fade-up">
          <h2 className="text-xl font-semibold mb-4 text-primary">My Donations</h2>
          {donations.length === 0 ? <p>No donations yet.</p> : (
            <ul className="space-y-2">
              {donations.map((food) => (
                <li key={food._id} className="border-b pb-2">
                  <span className="font-medium">{food.title}</span> - {food.status}
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card className="p-6 animate-fade-up">
          <h2 className="text-xl font-semibold mb-4 text-primary">My Claims</h2>
          {claims.length === 0 ? <p>No claims yet.</p> : (
            <ul className="space-y-2">
              {claims.map((claim) => (
                <li key={claim._id} className="border-b pb-2">
                  <span className="font-medium">{claim.foodListing?.title || "(deleted)"}</span> - {claim.status}
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card className="p-6 animate-fade-up">
          <h2 className="text-xl font-semibold mb-4 text-primary">My Volunteer Applications</h2>
          {volunteers.length === 0 ? <p>No volunteer applications yet.</p> : (
            <ul className="space-y-2">
              {volunteers.map((v) => (
                <li key={v._id} className="border-b pb-2">
                  <span className="font-medium">{v.area}</span> - {v.availability}
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Profile; 