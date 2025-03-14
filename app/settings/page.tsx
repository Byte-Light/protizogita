"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";

// Temporarily cast to any to bypass TS errors.
// Make sure your AuthContext provides these properties.
const SettingsPage: React.FC = () => {
  const { user, updateProfile, changePassword, logout } = useAuth() as any;
  const router = useRouter();

  // States for profile update
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profileMessage, setProfileMessage] = useState("");

  // States for password change
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  // State for notifications (dummy toggle)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Call update profile function from auth context or API
      await updateProfile({ name, email });
      setProfileMessage("Profile updated successfully!");
    } catch (error) {
      setProfileMessage("Error updating profile. Please try again.");
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Call change password function from auth context or API
      await changePassword({ currentPassword, newPassword });
      setPasswordMessage("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      setPasswordMessage("Error changing password. Please check your credentials.");
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>

      {/* Profile Settings Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Account Settings</h2>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="your.email@example.com"
              required
            />
          </div>
          {profileMessage && (
            <p className="text-sm text-green-600">{profileMessage}</p>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Update Profile
          </button>
        </form>
      </section>

      {/* Password Change Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Change Password</h2>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600" htmlFor="currentPassword">
              Current Password
            </label>
            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter current password"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600" htmlFor="newPassword">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter new password"
              required
            />
          </div>
          {passwordMessage && (
            <p className="text-sm text-green-600">{passwordMessage}</p>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Change Password
          </button>
        </form>
      </section>

      {/* Notification Settings Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Notification Settings</h2>
        <div className="flex items-center">
          <label className="mr-4 text-gray-600">Enable Notifications:</label>
          <button
            onClick={() => setNotificationsEnabled((prev) => !prev)}
            className={`px-4 py-2 rounded-full transition ${
              notificationsEnabled ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <span className="text-white text-sm">
              {notificationsEnabled ? "On" : "Off"}
            </span>
          </button>
        </div>
      </section>

      {/* Logout Section */}
      <section>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Sign Out
        </button>
      </section>
    </main>
  );
};

export default SettingsPage;
