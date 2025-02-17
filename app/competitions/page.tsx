// src/app/competitions/page.tsx

import Link from 'next/link';
import Image from 'next/image';

type Competition = {
  id: string;
  title: string;
  coverImage: string;
  prizeAmount: number;
  submissionDeadline: string; // ISO string
};

// Simulated async API call to fetch competitions.
// Replace with a real API call in production.
async function getCompetitions(): Promise<Competition[]> {
  return [
    {
      id: 'demo1',
      title: 'Innovative Design Challenge',
      coverImage: '/assets/images/banner.jpg',
      prizeAmount: 1000,
      submissionDeadline: new Date(Date.now() + 86400000).toISOString(), // 24 hours later
    },
    {
      id: 'demo2',
      title: 'Tech Innovation Contest',
      coverImage: '/assets/images/banner.jpg',
      prizeAmount: 2000,
      submissionDeadline: new Date(Date.now() + 172800000).toISOString(), // 48 hours later
    },
    // Add more competitions as needed.
  ];
}

export default async function CompetitionsPage() {
  const competitions = await getCompetitions();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Competitions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {competitions.map((comp) => (
          <Link
            key={comp.id}
            href={`/competitions/${comp.id}`}
            className="block bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden"
          >
            <div className="relative h-48 w-full">
              <Image
                src={comp.coverImage}
                alt={comp.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold">{comp.title}</h2>
              <p className="text-indigo-600 font-medium mt-2">Prize: ${comp.prizeAmount}</p>
              <p className="text-gray-600 text-sm">
                Deadline: {new Date(comp.submissionDeadline).toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
