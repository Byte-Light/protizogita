// src/components/create-contest-form/ContestForm.tsx
"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { db } from '@/firebaseConfig';
import { collection, addDoc } from "firebase/firestore";
import ContestTitleInput from './ContestTitleInput';
import ContestDescriptionInput from './ContestDescriptionInput';
import ContestRulesInput from './ContestRulesInput';
import ContestPrizeInput from './ContestPrizeInput';
import ContestDeadlineInput from './ContestDeadlineInput';
import CoverImageUpload from './CoverImageUpload';
import AttachmentUpload from './AttachmentUpload';

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

  // Handle text/number inputs
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'prizeAmount' ? parseFloat(value) : value,
    }));
  };

  // Handle attachment file change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && e.target.name === 'attachment') {
      setFormData((prev) => ({ ...prev, attachment: file }));
    }
  };

  // Handle cover image change and preview
  const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, coverImage: file }));
      const previewURL = URL.createObjectURL(file);
      setCoverPreview(previewURL);
    }
  };

  // Submit form data to Firestore and call onSubmit callback
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "contests"), {
        title: formData.title,
        description: formData.description,
        rules: formData.rules,
        prizeAmount: formData.prizeAmount,
        submissionDeadline: formData.submissionDeadline,
        attachmentName: formData.attachment ? formData.attachment.name : null,
        coverImageName: formData.coverImage ? formData.coverImage.name : null,
        createdAt: new Date()
      });
      onSubmit(formData);
      alert("Contest created successfully!");
      // Reset form state
      setFormData({
        title: '',
        description: '',
        rules: '',
        prizeAmount: 0,
        submissionDeadline: '',
      });
      setCoverPreview(null);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error creating contest. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Create a New Contest</h2>
      <ContestTitleInput title={formData.title} onChange={handleChange} />
      <ContestDescriptionInput description={formData.description} onChange={handleChange} />
      <ContestRulesInput rules={formData.rules} onChange={handleChange} />
      <ContestPrizeInput prizeAmount={formData.prizeAmount} onChange={handleChange} />
      <ContestDeadlineInput submissionDeadline={formData.submissionDeadline} onChange={handleChange} />
      <CoverImageUpload coverPreview={coverPreview} onChange={handleCoverChange} />
      <AttachmentUpload onChange={handleFileChange} />
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
