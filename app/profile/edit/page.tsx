"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/firebaseConfig";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Image from "next/image";

interface EditProfileData {
  displayName: string;
  bio: string;
  achievements: string; // comma-separated list
  photoURL: string;
}

const ProfileEditPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<EditProfileData>({
    displayName: "",
    bio: "",
    achievements: "",
    photoURL: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [userUid, setUserUid] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUserUid(firebaseUser.uid);
        try {
          const docRef = doc(db, "users", firebaseUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setFormData({
              displayName: firebaseUser.displayName || data.displayName || "",
              bio: data.bio || "",
              achievements: data.achievements
                ? data.achievements.join(", ")
                : "",
              photoURL: firebaseUser.photoURL || data.photoURL || "",
            });
          } else {
            // Document doesn't exist; use Auth defaults.
            setFormData({
              displayName: firebaseUser.displayName || "",
              bio: "",
              achievements: "",
              photoURL: firebaseUser.photoURL || "",
            });
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      } else {
        setMessage("No user logged in.");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!userUid) return;
    setSubmitting(true);
    setMessage(null);
    try {
      // Use setDoc with merge: true to create or update the document.
      const docRef = doc(db, "users", userUid);
      await setDoc(
        docRef,
        {
          displayName: formData.displayName,
          bio: formData.bio,
          achievements: formData.achievements
            .split(",")
            .map((a) => a.trim())
            .filter((a) => a !== ""),
          photoURL: formData.photoURL,
        },
        { merge: true }
      );
      // Optionally update Firebase Auth profile
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: formData.displayName,
          photoURL: formData.photoURL,
        });
      }
      setMessage("Profile updated successfully!");
      setTimeout(() => {
        router.push("/profile");
      }, 1500);
    } catch (error: any) {
      console.error("Error updating profile:", error);
      setMessage(error.message || "Failed to update profile.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Loading profile data...</p>
      </div>
    );
  }

  if (!userUid) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">No user logged in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Edit Profile
        </h1>
        {message && (
          <p className="text-center mb-4 text-green-600">{message}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture Preview */}
          <div className="flex items-center space-x-4">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-600">
              <Image
                src={formData.photoURL || "https://via.placeholder.com/150"}
                alt="Profile Picture"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="photoURL"
                className="block text-sm font-medium text-gray-700"
              >
                Profile Picture URL
              </label>
              <input
                type="text"
                id="photoURL"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          {/* Display Name */}
          <div>
            <label
              htmlFor="displayName"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          {/* Bio */}
          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {/* Achievements */}
          <div>
            <label
              htmlFor="achievements"
              className="block text-sm font-medium text-gray-700"
            >
              Achievements (comma-separated)
            </label>
            <input
              type="text"
              id="achievements"
              name="achievements"
              value={formData.achievements}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={submitting}
              className="w-full md:w-auto bg-indigo-600 text-white px-6 py-2 rounded-full shadow hover:bg-indigo-700 transition"
            >
              {submitting ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditPage;
