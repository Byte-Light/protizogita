"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebaseConfig";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useAuth } from "@/components/AuthContext";
import { Loader2 } from "lucide-react";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Login with Email & Password
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingEmail(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);
      login(); // update auth context

      setMessage("Login successful! Redirecting...");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error: any) {
      console.error("Login failed:", error);
      setMessage(error.message || "Invalid credentials. Please try again.");
    } finally {
      setLoadingEmail(false);
    }
  };

  // Login with Google
  const handleGoogleLogin = async () => {
    setLoadingGoogle(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      localStorage.setItem("token", token);
      login(); // update auth context

      setMessage("Google login successful! Redirecting...");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error: any) {
      console.error("Google login failed:", error);
      setMessage(error.message || "Google login failed. Please try again.");
    } finally {
      setLoadingGoogle(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
            required
          />
        </div>
        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
            required
          />
        </div>
        {/* Email Login Button */}
        <button
          type="submit"
          disabled={loadingEmail}
          className="w-full flex justify-center items-center gap-2 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loadingEmail ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>

      {message && <p className="mt-4 text-center text-green-600">{message}</p>}

      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-2 text-gray-500">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Google Login Button */}
      <button
        type="button"
        disabled={loadingGoogle}
        onClick={handleGoogleLogin}
        className="w-full flex justify-center items-center gap-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loadingGoogle ? (
          <>
            <Loader2 className="animate-spin h-5 w-5" />
            Please wait...
          </>
        ) : (
          "Login with Google"
        )}
      </button>

      <p className="mt-4 text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <button
          onClick={() => router.push("/auth/signup")}
          className="text-indigo-500 hover:underline focus:outline-none"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
