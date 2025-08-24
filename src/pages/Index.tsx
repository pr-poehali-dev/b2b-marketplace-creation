import Header from "@/components/Header";
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
      <div className="ml-64">
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