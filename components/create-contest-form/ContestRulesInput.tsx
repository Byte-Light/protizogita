// ContestRulesInput.tsx
import React from 'react';

interface ContestRulesInputProps {
  rules: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ContestRulesInput: React.FC<ContestRulesInputProps> = ({ rules, onChange }) => (
  <div className="mb-4">
    <label htmlFor="rules" className="block text-sm font-medium text-gray-700">
      Rules & Guidelines
    </label>
    <textarea
      id="rules"
      name="rules"
      value={rules}
      onChange={onChange}
      rows={4}
      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
      placeholder="Enter the contest rules and guidelines"
      required
    />
  </div>
);

export default ContestRulesInput;
