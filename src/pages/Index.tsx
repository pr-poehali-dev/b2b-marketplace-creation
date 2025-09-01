import Header from "@/components/Header";
import BrandHeader from "@/components/BrandHeader";
import HeroSection from "@/components/HeroSection";
import SearchSection from "@/components/SearchSection";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import ProductsSection from "@/components/ProductsSection";
import DeliverySection from "@/components/DeliverySection";
import SettingsSection from "@/components/SettingsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="ml-56 transition-all duration-300">
        <HeroSection />
        <SearchSection />
        <AboutSection />
        <FeaturesSection />
        <ProductsSection />
        <DeliverySection />
        <SettingsSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;