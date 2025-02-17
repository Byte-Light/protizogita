// src/app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-800">
            Welcome to CompetitionApp
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Crowdsourced competitions where innovative minds create, compete, and win cash prizes!
          </p>
          <div className="mt-8">
            <Link
              href="/auth/signup"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-indigo-700 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Platform Features
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <Image
                src="/assets/images/feature1.png"
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
                src="/assets/images/feature2.png"
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
                src="/assets/images/feature3.png"
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

      {/* Testimonials Section */}
      <section className="w-full bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800">What Our Users Say</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 italic">
                "CompetitionApp transformed our approach to innovation. The competitions are fun,
                engaging, and truly bring out the best ideas!"
              </p>
              <p className="mt-4 text-gray-800 font-semibold">– Alex, Startup Founder</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 italic">
                "As a competitor, it's an exciting challenge that has helped me grow my portfolio
                and connect with industry leaders."
              </p>
              <p className="mt-4 text-gray-800 font-semibold">– Jamie, Creative Professional</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="w-full bg-indigo-600 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to join the competition?
          </h2>
          <p className="mt-4 text-xl text-white">
            Sign up today and showcase your talent!
          </p>
          <div className="mt-8">
            <Link
              href="/auth/signup"
              className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-100 transition"
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
