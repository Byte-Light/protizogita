// src/app/dashboard/page.tsx

import Link from 'next/link';
import React from 'react';

type DashboardPageProps = {};

export default function DashboardPage({}: DashboardPageProps) {
  // Sample metrics data (in a real app, fetch from an API)
  const metrics = {
    totalCompetitions: 5,
    activeCompetitions: 3,
    totalSubmissions: 12,
    notifications: 2,
  };

  // Simulate user role; in production, derive this from your auth context
  const userRole: 'poster' | 'competitor' = 'poster';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Competitions</p>
          <p className="text-2xl font-semibold">{metrics.totalCompetitions}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-sm text-gray-500">Active Competitions</p>
          <p className="text-2xl font-semibold">{metrics.activeCompetitions}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Submissions</p>
          <p className="text-2xl font-semibold">{metrics.totalSubmissions}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-sm text-gray-500">Notifications</p>
          <p className="text-2xl font-semibold">{metrics.notifications}</p>
        </div>
      </div>

      {/* Conditional Content Based on User Role */}
      {userRole === 'poster' ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">My Competitions</h2>
          {/* List of Competitions for Task Posters */}
          <div className="space-y-4">
            <div className="bg-white shadow rounded-lg p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold text-xl">Competition Title 1</p>
                <p className="text-gray-500 text-sm">Deadline: 12/31/2025</p>
              </div>
              <Link href="/competitions/demo1">
                <span className="text-indigo-600 hover:underline cursor-pointer">
                  View Details
                </span>
              </Link>
            </div>
            <div className="bg-white shadow rounded-lg p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold text-xl">Competition Title 2</p>
                <p className="text-gray-500 text-sm">Deadline: 01/15/2026</p>
              </div>
              <Link href="/competitions/demo2">
                <span className="text-indigo-600 hover:underline cursor-pointer">
                  View Details
                </span>
              </Link>
            </div>
            {/* Additional competition cards can be added here */}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">My Submissions</h2>
          {/* List of Submissions for Competitors */}
          <div className="space-y-4">
            <div className="bg-white shadow rounded-lg p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold text-xl">Submission Title 1</p>
                <p className="text-gray-500 text-sm">Competition: Innovative Design Challenge</p>
              </div>
              <Link href="/submissions/demo1">
                <span className="text-indigo-600 hover:underline cursor-pointer">
                  View Submission
                </span>
              </Link>
            </div>
            <div className="bg-white shadow rounded-lg p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold text-xl">Submission Title 2</p>
                <p className="text-gray-500 text-sm">Competition: Tech Innovation Contest</p>
              </div>
              <Link href="/submissions/demo2">
                <span className="text-indigo-600 hover:underline cursor-pointer">
                  View Submission
                </span>
              </Link>
            </div>
            {/* Additional submission cards can be added here */}
          </div>
        </div>
      )}
    </div>
  );
}
