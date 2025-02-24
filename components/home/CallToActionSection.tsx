"use client";
import React from "react";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext"; // Adjust path as needed

const CallToActionSection: React.FC = () => {
  const { isLoggedIn } = useAuth();

  const targetHref = isLoggedIn ? "/post-contest" : "/auth/signup";
  const buttonText = isLoggedIn ? "Post a Contest" : "Sign Up Now";
  const description = isLoggedIn
    ? "Share your contest and start competing today!"
    : "Sign up today and showcase your talent!";

  return (
    <section className="w-full bg-indigo-600 py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white">
          Ready to join the competition?
        </h2>
        <p className="mt-4 text-xl text-white">{description}</p>
        <div className="mt-8">
          <Link
            href={targetHref}
            className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-100 transition"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
