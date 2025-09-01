import Header from "@/components/Header";
import BrandHeader from "@/components/BrandHeader";
import HeroSection from "@/components/HeroSection";
import SearchSection from "@/components/SearchSection";

import FeaturesSection from "@/components/FeaturesSection";
import ProductsSection from "@/components/ProductsSection";
import DeliverySection from "@/components/DeliverySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="ml-56 transition-all duration-300">
        <HeroSection />
        <SearchSection />
        <FeaturesSection />
        <ProductsSection />
        <DeliverySection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;