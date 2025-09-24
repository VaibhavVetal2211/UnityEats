import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  
import { Mail, Lock, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.login({ email, password });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        console.log(data.token);
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-8 animate-fade-up">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">Welcome Back</h1>
          <p className="mt-2 text-muted-foreground">Sign in to your account to continue</p>
        </div>
        <Card className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground flex items-center space-x-2">
                <Lock className="h-4 w-4" />
                <span>Password</span>
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button type="submit" className="w-full group" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline">Google</Button>
              <Button variant="outline">Facebook</Button>
            </div>
          </div>
        </Card>
        <div className="text-center text-sm">
          <span className="text-muted-foreground">Don't have an account? </span>
          <Link to="/register" className="text-primary hover:underline font-medium">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;