"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useAuth } from "@/components/AuthContext";
import { Loader2 } from "lucide-react";

const SignupForm = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Sign up with Email & Password
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingEmail(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);
      login(); // update auth context

      setMessage("Signup successful! Redirecting...");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error: any) {
      console.error("Signup failed:", error);
      setMessage(error.message || "Signup failed. Please try again.");
    } finally {
      setLoadingEmail(false);
    }
  };

  // Sign up with Google
  const handleGoogleSignUp = async () => {
    setLoadingGoogle(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      localStorage.setItem("token", token);
      login(); // update auth context

      setMessage("Google signup successful! Redirecting...");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error: any) {
      console.error("Google signup failed:", error);
      setMessage(error.message || "Google signup failed. Please try again.");
    } finally {
      setLoadingGoogle(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Signup</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-500"
            required
          />
        </div>
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
        {/* Email Signup Button */}
        <button
          type="submit"
          disabled={loadingEmail}
          className="w-full flex justify-center items-center gap-2 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loadingEmail ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" />
              Signing up...
            </>
          ) : (
            "Signup"
          )}
        </button>
      </form>

      {message && <p className="mt-4 text-center text-green-600">{message}</p>}

      {/* Divider */}
      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-2 text-gray-500">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Google Signup Button */}
      <button
        type="button"
        disabled={loadingGoogle}
        onClick={handleGoogleSignUp}
        className="w-full flex justify-center items-center gap-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loadingGoogle ? (
          <>
            <Loader2 className="animate-spin h-5 w-5" />
            Please wait...
          </>
        ) : (
          "Sign up with Google"
        )}
      </button>

      {/* Redirect to Login */}
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <button
          onClick={() => router.push("/auth/login")}
          className="text-indigo-500 hover:underline focus:outline-none"
        >
          Sign In
        </button>
      </p>
    </div>
  );
};

export default SignupForm;
