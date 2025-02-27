// CoverImageUpload.tsx
import React from 'react';

interface CoverImageUploadProps {
  coverPreview: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CoverImageUpload: React.FC<CoverImageUploadProps> = ({ coverPreview, onChange }) => (
  <div className="mb-4">
    <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
      Contest Cover Image (Optional)
    </label>
    <input
      type="file"
      id="coverImage"
      name="coverImage"
      onChange={onChange}
      accept="image/*"
      className="mt-1 block w-full text-sm text-gray-500"
    />
    {coverPreview && (
      <div className="mt-2">
        <img src={coverPreview} alt="Cover Preview" className="h-32 w-auto rounded-md border" />
      </div>
    )}
  </div>
);

export default CoverImageUpload;
