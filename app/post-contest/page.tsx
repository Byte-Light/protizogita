// src/app/post-contest/page.tsx
"use client";
import React from 'react';
import ContestForm, { ContestFormData } from '@/components/create-contest-form/ContestForm';

const PostContest: React.FC = () => {
  const handleContestSubmit = (data: ContestFormData) => {
    console.log("Contest submitted:", data);
    // Additional logic can be added here (e.g., redirection)
  };

  return (
    <div className="py-8">
      <ContestForm onSubmit={handleContestSubmit} />
    </div>
  );
};

export default PostContest;
