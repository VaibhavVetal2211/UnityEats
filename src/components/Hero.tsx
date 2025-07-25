import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FeaturedDishes } from "./FeaturedDishes";

export const Hero = () => {
  return (
    <div>
      <div className="relative min-h-[600px] flex items-center justify-center bg-cover bg-center" 
           style={{ 
             backgroundImage: 'url("https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
           }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4">
          <div className="mb-6 animate-fade-up">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 font-serif">
              ShareAPlate
            </h1>
            <span className="text-xl md:text-2xl text-accent italic">Nourish • Connect • Share</span>
          </div>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Join our community in reducing food waste and helping those in need. 
            Every meal shared is a step towards a better world.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/find-food">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Find Food
              </Button>
            </Link>
            <Link to="/donate">
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white">
                Donate Food
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <FeaturedDishes />
    </div>
  );
};