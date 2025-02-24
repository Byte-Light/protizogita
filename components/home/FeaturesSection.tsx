"use client";
import React from "react";
import Image from "next/image";

const FeaturesSection: React.FC = () => {
  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Platform Features
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <Image
              src="https://picsum.photos/seed/picsum/200"
              alt="Create Competitions"
              width={64}
              height={64}
              className="mx-auto"
            />
            <h3 className="mt-4 text-xl font-semibold text-gray-700">
              Create Competitions
            </h3>
            <p className="mt-2 text-gray-600">
              Easily create, customize, and manage competitions.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <Image
              src="https://picsum.photos/seed/picsum/200"
              alt="Real-Time Leaderboards"
              width={64}
              height={64}
              className="mx-auto"
            />
            <h3 className="mt-4 text-xl font-semibold text-gray-700">
              Real-Time Leaderboards
            </h3>
            <p className="mt-2 text-gray-600">
              Stay updated with live rankings and progress.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <Image
              src="https://picsum.photos/seed/picsum/200"
              alt="Secure Payments"
              width={64}
              height={64}
              className="mx-auto"
            />
            <h3 className="mt-4 text-xl font-semibold text-gray-700">
              Secure Payments
            </h3>
            <p className="mt-2 text-gray-600">
              Manage prize funds and payouts with ease.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
