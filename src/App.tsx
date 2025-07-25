import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import Index from "./pages/Index";
import Login from "./pages/Login";
import FindFood from "./pages/FindFood";
import ClaimFood from "./pages/ClaimFood";
import Checkout from "./pages/Checkout";
import Receipt from "./pages/Receipt";
import Donate from "./pages/Donate";
import Volunteer from "./pages/Volunteer";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/find-food" element={<FindFood />} />
                <Route path="/claim/:id" element={<ClaimFood />} />
                <Route path="/checkout/:id" element={<Checkout />} />
                <Route path="/receipt/:id" element={<Receipt />} />
                <Route path="/donate" element={<Donate />} />
                <Route path="/volunteer" element={<Volunteer />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;