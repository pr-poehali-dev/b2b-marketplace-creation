import { useState } from 'react';
import Header from "@/components/Header";
import PageLayout from '@/components/layout/PageLayout';
import HeroSection from "@/components/HeroSection";
import SearchSection from "@/components/SearchSection";
import SupplierSection from "@/components/SupplierSection";
import NewsSection from "@/components/NewsSection";
import FeaturesSection from "@/components/FeaturesSection";
import CategoriesGrid from "@/components/home/CategoriesGrid";
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
      <PageLayout>
        <CategoriesGrid />
        <div className="px-6 py-8">
          <PopularProducts limit={8} className="mb-8" />
        </div>
        <HeroSection isModalOpen={isModalOpen} shouldRestart={shouldRestartSlideshow} />
        <SupplierSection />
        <FeaturesSection />
        <NewsSection />
        <SearchSection />
        <DeliverySection />
        <Footer />
      </PageLayout>
    </div>
  );
};

export default Index;