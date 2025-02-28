// HeroSection.tsx
"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";

const HeroSection: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const targetHref = isLoggedIn ? "/post-contest" : "/auth/login";

  return (
    <section className="w-full bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold text-gray-800">Welcome to Protizogita</h1>
        <p className="mt-4 text-xl text-gray-600">
          Crowdsourced competitions where innovative minds create, compete, and win cash prizes!
        </p>
        <div className="mt-8">
          <Link
            href={targetHref}
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-indigo-700 transition"
          >
            Create Contest
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
