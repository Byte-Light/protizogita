"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { auth, db } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

interface ExtendedUserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string | null;
  bio: string;
  competitionsEntered: number;
  totalWins: number;
  currentRanking: number;
  achievements: string[];
  notifications: number;
  role: string;
  joinDate: string;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<ExtendedUserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Set up defaults in case extra data is not in Firestore
        const defaultProfile: ExtendedUserProfile = {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName || "John Doe",
          email: firebaseUser.email || "example@example.com",
          photoURL: firebaseUser.photoURL,
          bio: "I am a passionate developer and tech enthusiast.",
          competitionsEntered: 5, // default manual value
          totalWins: 2,
          currentRanking: 10,
          achievements: ["First Place", "Top Contributor"],
          notifications: 3,
          role: "Competitor",
          joinDate: firebaseUser.metadata.creationTime || new Date().toLocaleDateString(),
        };

        // Try to fetch additional profile data from Firestore
        try {
          const docRef = doc(db, "users", firebaseUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            defaultProfile.bio = data.bio || defaultProfile.bio;
            defaultProfile.competitionsEntered = data.competitionsEntered || defaultProfile.competitionsEntered;
            defaultProfile.totalWins = data.totalWins || defaultProfile.totalWins;
            defaultProfile.currentRanking = data.currentRanking || defaultProfile.currentRanking;
            defaultProfile.achievements = data.achievements || defaultProfile.achievements;
            defaultProfile.notifications = data.notifications || defaultProfile.notifications;
            defaultProfile.role = data.role || defaultProfile.role;
            defaultProfile.joinDate = data.joinDate || defaultProfile.joinDate;
          }
        } catch (error) {
          console.error("Error fetching user profile data:", error);
        }

        setProfile(defaultProfile);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">No user logged in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-600 py-8 px-6 flex flex-col md:flex-row items-center">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Image
              src={profile.photoURL || "https://via.placeholder.com/200"}
              alt={profile.displayName || "User Avatar"}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="mt-4 md:mt-0 md:ml-8 text-center md:text-left">
            <h1 className="text-4xl font-bold text-white">{profile.displayName}</h1>
            <p className="text-indigo-200 mt-2">{profile.email}</p>
            <div className="mt-4">
              <Link
                href="/profile/edit"
                className="inline-block bg-white text-indigo-600 px-6 py-2 rounded-full shadow hover:bg-gray-100 transition"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50">
          <div className="p-4 bg-white rounded-lg shadow hover:shadow-xl transition">
            <h2 className="text-lg font-semibold text-gray-700">Bio</h2>
            <p className="mt-2 text-gray-600">{profile.bio}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow hover:shadow-xl transition">
            <h2 className="text-lg font-semibold text-gray-700">Competitions Entered</h2>
            <p className="mt-2 text-gray-600">{profile.competitionsEntered}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow hover:shadow-xl transition">
            <h2 className="text-lg font-semibold text-gray-700">Total Wins</h2>
            <p className="mt-2 text-gray-600">{profile.totalWins}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow hover:shadow-xl transition">
            <h2 className="text-lg font-semibold text-gray-700">Current Ranking</h2>
            <p className="mt-2 text-gray-600">{profile.currentRanking}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow hover:shadow-xl transition">
            <h2 className="text-lg font-semibold text-gray-700">Achievements</h2>
            <p className="mt-2 text-gray-600">{profile.achievements.join(", ")}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow hover:shadow-xl transition">
            <h2 className="text-lg font-semibold text-gray-700">Notifications</h2>
            <p className="mt-2 text-gray-600">{profile.notifications}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow hover:shadow-xl transition">
            <h2 className="text-lg font-semibold text-gray-700">Role</h2>
            <p className="mt-2 text-gray-600">{profile.role}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow hover:shadow-xl transition">
            <h2 className="text-lg font-semibold text-gray-700">Join Date</h2>
            <p className="mt-2 text-gray-600">{profile.joinDate}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow hover:shadow-xl transition">
            <h2 className="text-lg font-semibold text-gray-700">Portfolio URL</h2>
            <p className="mt-2 text-gray-600">
              <a href="#" className="text-indigo-600 hover:underline">
                https://portfolio.example.com
              </a>
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow hover:shadow-xl transition">
            <h2 className="text-lg font-semibold text-gray-700">Location</h2>
            <p className="mt-2 text-gray-600">New York, USA</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
