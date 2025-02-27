// ContestTitleInput.tsx
import React from 'react';

interface ContestTitleInputProps {
  title: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContestTitleInput: React.FC<ContestTitleInputProps> = ({ title, onChange }) => (
  <div className="mb-4">
    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
      Contest Title
    </label>
    <input
      type="text"
      id="title"
      name="title"
      value={title}
      onChange={onChange}
      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
      placeholder="Enter contest title"
      required
    />
  </div>
);

export default ContestTitleInput;
