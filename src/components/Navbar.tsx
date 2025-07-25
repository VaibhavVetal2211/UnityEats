import { Button } from "@/components/ui/button";
import { Menu, X, Heart, User, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold text-primary">ShareAPlate</span>
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
            <Link to="/login">
              <Button variant="outline" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Login</span>
              </Button>
            </Link>
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