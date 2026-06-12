import Hero from "@/components/home/Hero";
import PromoStrip from "@/components/home/PromoStrip";
import CategoryGrid from "@/components/home/CategoryGrid";
import PromoBanners from "@/components/home/PromoBanners";
import DealsSection from "@/components/home/DealsSection";
import MotorcycleSection from "@/components/home/MotorcycleSection";
import BrandsBar from "@/components/home/BrandsBar";
import InstallmentCalculator from "@/components/home/InstallmentCalculator";
import WhyKservico from "@/components/home/WhyKservico";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PromoStrip />
      <CategoryGrid />
      <PromoBanners />
      <DealsSection />
      <MotorcycleSection />
      <BrandsBar />
      <InstallmentCalculator />
      <WhyKservico />
    </>
  );
}
