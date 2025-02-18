// src/app/dashboard/poster/page.tsx
import Link from 'next/link';
import React from 'react';

const PosterDashboard: React.FC = () => {
  // Sample metrics data for Task Posters
  const metrics = {
    totalCompetitions: 12,
    activeCompetitions: 5,
    totalSubmissions: 45,
    notifications: 3,
  };

  // Dummy list of competitions for posters
  const competitions = [
    { id: 'demo1', title: 'Innovative Design Challenge', deadline: '12/31/2025' },
    { id: 'demo2', title: 'Tech Innovation Contest', deadline: '01/15/2026' },
    { id: 'demo3', title: 'Creative Writing Contest', deadline: '02/01/2026' },
    { id: 'demo4', title: 'Photography Contest', deadline: '02/15/2026' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Task Posters’ Dashboard</h1>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-sm text-gray-500">Total Competitions</p>
          <p className="text-3xl font-bold text-gray-800">{metrics.totalCompetitions}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-sm text-gray-500">Active Competitions</p>
          <p className="text-3xl font-bold text-gray-800">{metrics.activeCompetitions}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-sm text-gray-500">Total Submissions</p>
          <p className="text-3xl font-bold text-gray-800">{metrics.totalSubmissions}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-sm text-gray-500">Notifications</p>
          <p className="text-3xl font-bold text-gray-800">{metrics.notifications}</p>
        </div>
      </div>

      {/* Active Competitions Panel */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">My Active Competitions</h2>
        <div className="space-y-4">
          {competitions.map((comp) => (
            <div key={comp.id} className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div>
                <p className="font-semibold text-xl">{comp.title}</p>
                <p className="text-gray-500 text-sm">Deadline: {comp.deadline}</p>
              </div>
              <Link href={`/competitions/${comp.id}`}>
                <span className="mt-2 sm:mt-0 text-indigo-600 hover:underline cursor-pointer">
                  View Details
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/competitions/create" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
            Create New Competition
          </Link>
          <Link href="/analytics" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
            View Analytics
          </Link>
          <Link href="/messages" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Message Competitors
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PosterDashboard;
