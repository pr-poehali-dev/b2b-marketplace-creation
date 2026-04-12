import { useState } from 'react';
import Header from "@/components/Header";
import BrandHeader from "@/components/BrandHeader";
import HeroSection from "@/components/HeroSection";
import SearchSection from "@/components/SearchSection";
import SupplierSection from "@/components/SupplierSection";
import NewsSection from "@/components/NewsSection";
import FeaturesSection from "@/components/FeaturesSection";

import PopularProducts from "@/components/PopularProducts";
import DeliverySection from "@/components/DeliverySection";
import Footer from "@/components/Footer";
import WelcomeModal from "@/components/WelcomeModal";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldRestartSlideshow, setShouldRestartSlideshow] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setShouldRestartSlideshow(true);
    // Сбрасываем флаг перезапуска через небольшую задержку
    setTimeout(() => setShouldRestartSlideshow(false), 100);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <WelcomeModal onOpen={handleModalOpen} onClose={handleModalClose} />
      <div className="ml-56 transition-all duration-300">
        <HeroSection isModalOpen={isModalOpen} shouldRestart={shouldRestartSlideshow} />
        <SupplierSection />
        <div className="px-6 py-12">
          <PopularProducts limit={7} className="mb-8" />
        </div>
        <FeaturesSection />
        <NewsSection />
        <SearchSection />
        <DeliverySection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;