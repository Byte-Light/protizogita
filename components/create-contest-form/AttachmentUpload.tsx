// AttachmentUpload.tsx
import React from 'react';

interface AttachmentUploadProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AttachmentUpload: React.FC<AttachmentUploadProps> = ({ onChange }) => (
  <div className="mb-4">
    <label htmlFor="attachment" className="block text-sm font-medium text-gray-700">
      Attachment (Optional)
    </label>
    <input
      type="file"
      id="attachment"
      name="attachment"
      onChange={onChange}
      className="mt-1 block w-full text-sm text-gray-500"
    />
  </div>
);

export default AttachmentUpload;
