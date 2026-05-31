import HeroSection from "@/components/sections/hero";
import AnniversarySection from "@/components/sections/anniversary";
import TimelineSection from "@/components/sections/timeline";
import GallerySection from "@/components/sections/gallery";
import DailyQuestionSection from "@/components/sections/daily-question";

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <HeroSection />

      <AnniversarySection />

      <TimelineSection />

      <GallerySection />

      <DailyQuestionSection />
    </main>
  );
}