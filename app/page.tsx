import React from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CallToActionSection from "@/components/home/CallToActionSection";
import FilterSearch from "@/components/home/FilterSearch";

export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <FilterSearch />
      <FeaturesSection />
      <TestimonialsSection />
      <CallToActionSection />
    </main>
  );
}
