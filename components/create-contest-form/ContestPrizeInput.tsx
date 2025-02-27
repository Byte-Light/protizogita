// ContestPrizeInput.tsx
import React from 'react';

interface ContestPrizeInputProps {
  prizeAmount: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContestPrizeInput: React.FC<ContestPrizeInputProps> = ({ prizeAmount, onChange }) => (
  <div className="mb-4">
    <label htmlFor="prizeAmount" className="block text-sm font-medium text-gray-700">
      Prize Amount ($)
    </label>
    <input
      type="number"
      id="prizeAmount"
      name="prizeAmount"
      value={prizeAmount}
      onChange={onChange}
      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
      placeholder="Enter prize amount"
      required
      min="0"
    />
  </div>
);

export default ContestPrizeInput;
