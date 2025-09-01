import Header from "@/components/Header";
import BusinessHeroSection from "@/components/BusinessHeroSection";
import TrustedCompaniesSection from "@/components/TrustedCompaniesSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ROICalculatorSection from "@/components/ROICalculatorSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="ml-56 transition-all duration-300">
        <BusinessHeroSection />
        <TrustedCompaniesSection />
        <FeaturesSection />
        <TestimonialsSection />
        <ROICalculatorSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;