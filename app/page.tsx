// src/app/page.tsx (or your Home component)
import React from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CallToActionSection from "@/components/home/CallToActionSection";
import FilterSearch from "@/components/home/FilterSearch";
import ContestList from "@/components/competitions/ContestList";

export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <FilterSearch />
      {/* Show only 2 contests on the homepage */}
      <ContestList limit={2} />
      <FeaturesSection />
      <TestimonialsSection />
      <CallToActionSection />
    </main>
  );
}
