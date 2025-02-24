"use client";
import React from "react";

const TestimonialsSection: React.FC = () => {
  return (
    <section className="w-full bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          What Our Users Say
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 italic">
              "CompetitionApp transformed our approach to innovation. The competitions are fun,
              engaging, and truly bring out the best ideas!"
            </p>
            <p className="mt-4 text-gray-800 font-semibold">
              – Alex, Startup Founder
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 italic">
              "As a competitor, it's an exciting challenge that has helped me grow my portfolio
              and connect with industry leaders."
            </p>
            <p className="mt-4 text-gray-800 font-semibold">
              – Jamie, Creative Professional
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
