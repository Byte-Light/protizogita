// src/app/dashboard/competitor/page.tsx
import Link from 'next/link';
import React from 'react';

const CompetitorDashboard: React.FC = () => {
  // Sample metrics data for Competitors
  const metrics = {
    competitionsEntered: 8,
    currentRanking: 3,
    totalWins: 2,
    notifications: 4,
  };

  // Dummy list of active submissions for competitors
  const submissions = [
    { id: 'sub1', title: 'Submission Title 1', competition: 'Innovative Design Challenge', deadline: '12/31/2025' },
    { id: 'sub2', title: 'Submission Title 2', competition: 'Tech Innovation Contest', deadline: '01/15/2026' },
  ];

  // Dummy available competitions list for competitors to join
  const availableCompetitions = [
    { id: 'demo9', title: 'Logo Design Contest', prizeAmount: 800, deadline: '02/20/2026' },
    { id: 'demo10', title: 'Social Media Campaign Contest', prizeAmount: 1200, deadline: '03/10/2026' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Competitor Dashboard</h1>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-sm text-gray-500">Competitions Entered</p>
          <p className="text-3xl font-bold text-gray-800">{metrics.competitionsEntered}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-sm text-gray-500">Current Ranking</p>
          <p className="text-3xl font-bold text-gray-800">{metrics.currentRanking}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-sm text-gray-500">Total Wins</p>
          <p className="text-3xl font-bold text-gray-800">{metrics.totalWins}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-sm text-gray-500">Notifications</p>
          <p className="text-3xl font-bold text-gray-800">{metrics.notifications}</p>
        </div>
      </div>

      {/* Active Submissions Panel */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">My Active Submissions</h2>
        <div className="space-y-4">
          {submissions.map((sub) => (
            <div key={sub.id} className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div>
                <p className="font-semibold text-xl">{sub.title}</p>
                <p className="text-gray-500 text-sm">Competition: {sub.competition}</p>
                <p className="text-gray-500 text-sm">Deadline: {sub.deadline}</p>
              </div>
              <Link href={`/submissions/${sub.id}`}>
                <span className="mt-2 sm:mt-0 text-indigo-600 hover:underline cursor-pointer">
                  View Submission
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Available Competitions */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Available Competitions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {availableCompetitions.map((comp) => (
            <div key={comp.id} className="bg-white rounded-lg shadow p-4 flex flex-col justify-between">
              <div>
                <p className="font-semibold text-xl">{comp.title}</p>
                <p className="text-indigo-600 font-medium mt-2">Prize: ${comp.prizeAmount}</p>
                <p className="text-gray-500 text-sm">Deadline: {comp.deadline}</p>
              </div>
              <Link href={`/competitions/${comp.id}`}>
                <span className="mt-4 text-indigo-600 hover:underline cursor-pointer">
                  Join Now
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements & History */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Achievements & History</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">
            Display badges, past competition results, and performance statistics here.
          </p>
          {/* In a real application, you could map over an achievements array or render a chart */}
        </div>
      </div>
    </div>
  );
};

export default CompetitorDashboard;
