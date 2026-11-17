import { Hero } from "@/components/home/Hero";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { HowWeWork } from "@/components/home/HowWeWork";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { CtaBanner } from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <HowWeWork />
      <FeaturedProjects />
      <TestimonialsSection />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
