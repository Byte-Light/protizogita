// src/components/ContestForm.tsx
"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';

export interface ContestFormData {
  title: string;
  description: string;
  rules: string;
  prizeAmount: number;
  submissionDeadline: string;
  attachment?: File;
  coverImage?: File;
}

interface ContestFormProps {
  onSubmit: (data: ContestFormData) => void;
}

const ContestForm: React.FC<ContestFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ContestFormData>({
    title: '',
    description: '',
    rules: '',
    prizeAmount: 0,
    submissionDeadline: '',
  });

  // For cover image preview
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'prizeAmount' ? parseFloat(value) : value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && e.target.name === 'attachment') {
      setFormData((prev) => ({
        ...prev,
        attachment: file,
      }));
    }
  };

  const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        coverImage: file,
      }));
      const previewURL = URL.createObjectURL(file);
      setCoverPreview(previewURL);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Create a New Contest</h2>

      {/* Contest Title */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Contest Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
          placeholder="Enter contest title"
          required
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
          placeholder="Describe the contest in detail"
          required
        />
      </div>

      {/* Rules & Guidelines */}
      <div className="mb-4">
        <label htmlFor="rules" className="block text-sm font-medium text-gray-700">
          Rules & Guidelines
        </label>
        <textarea
          id="rules"
          name="rules"
          value={formData.rules}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
          placeholder="Enter the contest rules and guidelines"
          required
        />
      </div>

      {/* Prize Amount */}
      <div className="mb-4">
        <label htmlFor="prizeAmount" className="block text-sm font-medium text-gray-700">
          Prize Amount ($)
        </label>
        <input
          type="number"
          id="prizeAmount"
          name="prizeAmount"
          value={formData.prizeAmount}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
          placeholder="Enter prize amount"
          required
          min="0"
        />
      </div>

      {/* Submission Deadline */}
      <div className="mb-4">
        <label htmlFor="submissionDeadline" className="block text-sm font-medium text-gray-700">
          Submission Deadline
        </label>
        <input
          type="datetime-local"
          id="submissionDeadline"
          name="submissionDeadline"
          value={formData.submissionDeadline}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
          required
        />
      </div>

      {/* Cover Image Upload */}
      <div className="mb-4">
        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
          Contest Cover Image (Optional)
        </label>
        <input
          type="file"
          id="coverImage"
          name="coverImage"
          onChange={handleCoverChange}
          accept="image/*"
          className="mt-1 block w-full text-sm text-gray-500"
        />
        {coverPreview && (
          <div className="mt-2">
            <img src={coverPreview} alt="Cover Preview" className="h-32 w-auto rounded-md border" />
          </div>
        )}
      </div>

      {/* Attachment */}
      <div className="mb-4">
        <label htmlFor="attachment" className="block text-sm font-medium text-gray-700">
          Attachment (Optional)
        </label>
        <input
          type="file"
          id="attachment"
          name="attachment"
          onChange={handleFileChange}
          className="mt-1 block w-full text-sm text-gray-500"
        />
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          type="submit"
          className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-lg font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Post Contest
        </button>
      </div>
    </form>
  );
};

export default ContestForm;
