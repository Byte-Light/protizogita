// src/components/ContestCard.tsx
import React from 'react';

interface ContestCardProps {
  id: string;
  title: string;
  description: string;
  rules: string;
  prizeAmount: number;
  submissionDeadline: string;
  coverImageName?: string | null;
  attachmentName?: string | null;
  createdAt: any; // Firestore timestamp
}

const ContestCard: React.FC<ContestCardProps> = ({
  title,
  description,
  rules,
  prizeAmount,
  submissionDeadline,
  coverImageName,
  createdAt,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col">
      {coverImageName ? (
        // In a real app, you might generate a URL for the file from Firebase Storage.
        <img
          src={`https://via.placeholder.com/400x200?text=${encodeURIComponent(title)}`}
          alt={title}
          className="h-48 w-full object-cover rounded-md mb-4"
        />
      ) : (
        <div className="h-48 w-full bg-gray-200 rounded-md mb-4 flex items-center justify-center">
          <span className="text-gray-500">No Cover Image</span>
        </div>
      )}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-700 mb-2">{description}</p>
      <p className="text-gray-600 text-sm mb-2">
        <strong>Rules:</strong> {rules}
      </p>
      <p className="text-gray-800 font-semibold mb-2">Prize: ${prizeAmount}</p>
      <p className="text-gray-600 text-sm mb-2">
        <strong>Deadline:</strong>{" "}
        {new Date(submissionDeadline).toLocaleString()}
      </p>
      <p className="text-gray-500 text-xs">
        Posted: {new Date(createdAt.seconds * 1000).toLocaleString()}
      </p>
    </div>
  );
};

export default ContestCard;
