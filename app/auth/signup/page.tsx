"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
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
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setTimeout(() => router.push('/sign-in'), 2000);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Signup failed:', error);
      setMessage('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Signup</h2>
      <form onSubmit={handleSubmit}>
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
            placeholder="Enter your name"
            required
          />
        </div>

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
          {loading ? 'Signing up...' : 'Signup'}
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
        Already have an account?{' '}
        <button
          onClick={() => router.push('/auth/login')}
          className="text-indigo-500 hover:underline focus:outline-none"
        >
          Sign In
        </button>
      </p>
    </div>
  );
};

export default SignupForm;