import Header from "@/components/Header";
import BrandHeader from "@/components/BrandHeader";
import HeroSection from "@/components/HeroSection";
import SearchSection from "@/components/SearchSection";
import NewsSection from "@/components/NewsSection";
import FeaturesSection from "@/components/FeaturesSection";
import B2BAdvantagesSection from "@/components/B2BAdvantagesSection";
import ProductsSection from "@/components/ProductsSection";
import RecommendedProducts from "@/components/product/RecommendedProducts";
import DeliverySection from "@/components/DeliverySection";
import Footer from "@/components/Footer";
import CallToActionBanner from "@/components/CallToActionBanner";
import WelcomeModal from "@/components/WelcomeModal";
import FloatingActionButton from "@/components/FloatingActionButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CallToActionBanner />
      <WelcomeModal />
      <FloatingActionButton />
      <div className="ml-56 transition-all duration-300">
        <HeroSection />
        <SearchSection />
        <NewsSection />
        <FeaturesSection />
        <B2BAdvantagesSection />
        <ProductsSection />
        <div className="px-6 py-8">
          <RecommendedProducts 
            title="Популярные товары" 
            limit={8} 
            className="mb-8"
          />
        </div>
        <DeliverySection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;