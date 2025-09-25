import { Button } from "@/components/ui/button";
import { Menu, X, Heart, User, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };
    checkToken();
    const onStorage = (e: StorageEvent) => {
      if (e.key === "token") {
        checkToken();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleProfileClick = async () => {
    // Navigate to profile; the page will call the profile API and display info
    navigate("/profile");
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold text-primary">UnityEats</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/find-food" className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors">
              <Search className="h-4 w-4" />
              <span>Find Food</span>
            </Link>
            <Link to="/donate" className="text-foreground hover:text-primary transition-colors">
              Donate
            </Link>
            <Link to="/volunteer" className="text-foreground hover:text-primary transition-colors">
              Volunteer
            </Link>
            {isAuthenticated ? (
              <Button variant="outline" className="flex items-center space-x-2" onClick={handleProfileClick}>
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Button>
            ) : (
              <Link to="/login">
                <Button variant="outline" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </Button>
              </Link>
            )}
          </div>
          
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-8">
                <Link to="/find-food" className="flex items-center space-x-2 text-lg">
                  <Search className="h-5 w-5" />
                  <span>Find Food</span>
                </Link>
                <Link to="/donate" className="text-lg">Donate</Link>
                <Link to="/volunteer" className="text-lg">Volunteer</Link>
                <Link to="/login">
                  <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Login</span>
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};