"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SignInForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setTimeout(() => router.push('/post-contest'), 2000);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Sign-in failed:', error);
      setMessage('Sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>
      <form onSubmit={handleSubmit}>
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
            placeholder="Enter your email"
            required
          />
        </div>

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
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 text-center ${
            message.includes('successful') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}

      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <button
          onClick={() => router.push('/auth/signup')}
          className="text-indigo-500 hover:underline focus:outline-none"
        >
          Signup
        </button>
      </p>
    </div>
  );
};

export default SignInForm;