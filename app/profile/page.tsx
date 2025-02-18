// src/app/profile/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
}

const ProfilePage: React.FC = () => {
  // Dummy user data
  const user: UserProfile = {
    id: 'user1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'I am a passionate developer and tech enthusiast. I love coding, designing, and building innovative solutions.',
    avatarUrl: 'https://picsum.photos/seed/picsum/200', // Ensure this image exists in your public folder
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-xl p-6">
        <div className="flex flex-col sm:flex-row items-center">
          {/* User Avatar */}
          <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 sm:mb-0 sm:mr-6">
            <Image
              src={user.avatarUrl}
              alt={user.name}
              fill
              className="object-cover"
            />
          </div>
          {/* User Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-gray-600 mt-2">{user.email}</p>
            <p className="mt-4 text-gray-700">{user.bio}</p>
            <div className="mt-4">
              <Link href="/profile/edit">
                <span className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
                  Edit Profile
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
