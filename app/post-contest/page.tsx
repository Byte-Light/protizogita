// src/app/post-contest/page.tsx (or wherever you want to place this page)
"use client"
import React from 'react';
import ContestForm, { ContestFormData } from '@/components/ContestForm';

const PostContest: React.FC = () => {
  // This function handles form submission.
  // In a real app, you might call an API to save the contest.
  const handleContestSubmit = (data: ContestFormData) => {
    console.log("Contest submitted:", data);
    // You can add further logic here (e.g., API call, redirection, etc.)
  };

  return (
    <div className="py-8">
      <ContestForm onSubmit={handleContestSubmit} />
    </div>
  );
};

export default PostContest;
