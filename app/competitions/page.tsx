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
      coverImage: 'https://picsum.photos/seed/picsum/200',
      prizeAmount: 1000,
      submissionDeadline: new Date(Date.now() + 86400000).toISOString(), // 24 hours later
    },
    {
      id: 'demo2',
      title: 'Tech Innovation Contest',
      coverImage: 'https://picsum.photos/seed/picsum/200',
      prizeAmount: 2000,
      submissionDeadline: new Date(Date.now() + 172800000).toISOString(), // 48 hours later
    },
    {
      id: 'demo3',
      title: 'Creative Writing Contest',
      coverImage: 'https://picsum.photos/seed/picsum/200',
      prizeAmount: 500,
      submissionDeadline: new Date(Date.now() + 259200000).toISOString(), // 72 hours later
    },
    {
      id: 'demo4',
      title: 'Photography Contest',
      coverImage: 'https://picsum.photos/seed/picsum/200',
      prizeAmount: 1500,
      submissionDeadline: new Date(Date.now() + 345600000).toISOString(), // 96 hours later
    },
    {
      id: 'demo5',
      title: 'Startup Pitch Competition',
      coverImage: 'https://picsum.photos/seed/picsum/200',
      prizeAmount: 2500,
      submissionDeadline: new Date(Date.now() + 432000000).toISOString(), // 120 hours later
    },
    {
      id: 'demo6',
      title: 'App Development Challenge',
      coverImage: 'https://picsum.photos/seed/picsum/200',
      prizeAmount: 3000,
      submissionDeadline: new Date(Date.now() + 518400000).toISOString(), // 144 hours later
    },
    {
      id: 'demo7',
      title: 'Logo Design Contest',
      coverImage: 'https://picsum.photos/seed/picsum/200',
      prizeAmount: 800,
      submissionDeadline: new Date(Date.now() + 604800000).toISOString(), // 168 hours later
    },
    {
      id: 'demo8',
      title: 'Social Media Campaign Contest',
      coverImage: 'https://picsum.photos/seed/picsum/200',
      prizeAmount: 1200,
      submissionDeadline: new Date(Date.now() + 691200000).toISOString(), // 192 hours later
    },
  ];
}

export default async function CompetitionsPage() {
  const competitions = await getCompetitions();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Competitions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
