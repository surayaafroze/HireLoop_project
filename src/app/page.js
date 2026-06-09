import Banner from "@/component/Banner";
import FeaturedJobs from "@/component/FeaturedJobs";
import FeaturesGrid from "@/component/FeaturesGrid";
import PricingSection from "@/component/PricingSection";
import StatsSection from "@/component/StatsSection";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <StatsSection></StatsSection>
      <FeaturedJobs></FeaturedJobs>
      <FeaturesGrid></FeaturesGrid>
      <PricingSection></PricingSection>
    </div>
  );
}
