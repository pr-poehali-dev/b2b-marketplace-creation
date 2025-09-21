
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Orders from "./pages/Orders";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import Categories from "./pages/Categories";
import Suppliers from "./pages/Suppliers";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Help from "./pages/Help";
import Pricing from "./components/Pricing";
import PricingPage from "./pages/PricingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SupplierRegisterPage from "./pages/SupplierRegisterPage";
import BuyerRegisterPage from "./pages/BuyerRegisterPage";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import ProfileCompany from "./pages/ProfileCompany";
import Profile from "./pages/Profile";

import NewsPublish from "./pages/NewsPublish";
import News from "./pages/News";
import Cart from "./pages/Cart";
import SupplierProductsPage from "./pages/SupplierProductsPage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";
import NotFound from "./pages/NotFound";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/catalog/categories" element={<Categories />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/help" element={<Help />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/supplier" element={<SupplierRegisterPage />} />
          <Route path="/register/buyer" element={<BuyerRegisterPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/company" element={<ProfileCompany />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/publish" element={<NewsPublish />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/supplier/products" element={<SupplierProductsPage />} />
          <Route path="/supplier/products/new" element={<AddProductPage />} />
          <Route path="/supplier/products/:id/edit" element={<EditProductPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;