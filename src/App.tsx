
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Orders from "./pages/Orders";
import Catalog from "./pages/Catalog";
import Suppliers from "./pages/Suppliers";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Help from "./pages/Help";
import Pricing from "./components/Pricing";
import PricingPage from "./pages/PricingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import ProfileCompany from "./pages/ProfileCompany";
import NewsPublish from "./pages/NewsPublish";
import News from "./pages/News";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import { CartProvider } from "./contexts/CartContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/help" element={<Help />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/profile/company" element={<ProfileCompany />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/publish" element={<NewsPublish />} />
          <Route path="/cart" element={<Cart />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;