import React from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CallToActionSection from "@/components/home/CallToActionSection";

export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CallToActionSection />
    </main>
  );
}
