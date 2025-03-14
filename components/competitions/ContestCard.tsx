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
  attachmentName, // Make sure to destructure attachmentName!
  createdAt,
}) => {
  // Convert Firestore timestamp to a JS Date object
  const postedDate = new Date(createdAt.seconds * 1000);
  const hoursAgo = Math.floor((Date.now() - postedDate.getTime()) / 1000 / 3600);

  // Format submission deadline
  const deadlineDate = new Date(submissionDeadline);

  return (
    <div className="border border-gray-200 rounded-lg bg-white p-4 shadow hover:shadow-md transition-shadow">
      {/* Top Row: Title and Posted Info */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500 mt-1 md:mt-0">
          Posted {hoursAgo <= 0 ? 'just now' : `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`}
        </p>
      </div>

      {/* Metadata Row: Prize & Deadline */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-2">
        <span className="font-semibold">Prize: ${prizeAmount}</span>
        <span className="hidden md:inline-block">|</span>
        <span>
          Deadline: {deadlineDate.toLocaleDateString()}{' '}
          {deadlineDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {/* Cover Image (if available) */}
      {coverImageName ? (
        <img
          src={`https://via.placeholder.com/400x200?text=${encodeURIComponent(title)}`}
          alt={title}
          className="w-full h-40 object-cover rounded mb-3"
        />
      ) : null}

      {/* Description */}
      <p className="text-gray-700 text-sm mb-2">{description}</p>

      {/* Rules */}
      <p className="text-gray-600 text-sm mb-3">
        <strong>Rules:</strong> {rules}
      </p>

      {/* Tags or Badges */}
      <div className="flex flex-wrap gap-2">
        {coverImageName && (
          <span className="bg-indigo-100 text-indigo-700 px-2 py-1 text-xs rounded-full">
            Cover Image
          </span>
        )}
        {attachmentName && (
          <span className="bg-green-100 text-green-700 px-2 py-1 text-xs rounded-full">
            Attachment
          </span>
        )}
      </div>

      {/* Posted time */}
      <p className="text-gray-500 text-xs mt-3">
        Posted: {postedDate.toLocaleString()}
      </p>
    </div>
  );
};

export default ContestCard;
