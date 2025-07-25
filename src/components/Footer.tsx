import { Mail, Phone, MapPin, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6" />
              <span className="text-2xl font-bold">ShareAPlate</span>
            </div>
            <p className="text-sm opacity-90">
              Connecting surplus food with those who need it most. Join our mission to reduce food waste and help the community.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/find-food" className="hover:underline">Find Food</Link></li>
              <li><Link to="/donate" className="hover:underline">Donate</Link></li>
              <li><Link to="/volunteer" className="hover:underline">Volunteer</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@shareaplate.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Food Street, NY 10001</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Reviews</h3>
            <div className="space-y-4">
              <div className="bg-primary-foreground/10 p-4 rounded-lg">
                <p className="text-sm italic">"Amazing initiative! Helped me donate excess food from my restaurant."</p>
                <p className="text-sm mt-2">- John D.</p>
              </div>
              <div className="bg-primary-foreground/10 p-4 rounded-lg">
                <p className="text-sm italic">"Very easy to use and helpful community!"</p>
                <p className="text-sm mt-2">- Sarah M.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ShareAPlate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};