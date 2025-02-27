// ContestDeadlineInput.tsx
import React from 'react';

interface ContestDeadlineInputProps {
  submissionDeadline: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContestDeadlineInput: React.FC<ContestDeadlineInputProps> = ({ submissionDeadline, onChange }) => (
  <div className="mb-4">
    <label htmlFor="submissionDeadline" className="block text-sm font-medium text-gray-700">
      Submission Deadline
    </label>
    <input
      type="datetime-local"
      id="submissionDeadline"
      name="submissionDeadline"
      value={submissionDeadline}
      onChange={onChange}
      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
      required
    />
  </div>
);

export default ContestDeadlineInput;
