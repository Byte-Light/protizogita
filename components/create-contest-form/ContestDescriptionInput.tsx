// ContestDescriptionInput.tsx
import React from 'react';

interface ContestDescriptionInputProps {
  description: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ContestDescriptionInput: React.FC<ContestDescriptionInputProps> = ({ description, onChange }) => (
  <div className="mb-4">
    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
      Description
    </label>
    <textarea
      id="description"
      name="description"
      value={description}
      onChange={onChange}
      rows={4}
      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
      placeholder="Describe the contest in detail"
      required
    />
  </div>
);

export default ContestDescriptionInput;
