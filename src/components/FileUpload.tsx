import React, { SetStateAction } from 'react';

const FileUpload = ({ setFileState }: { setFileState: React.Dispatch<SetStateAction<File | undefined>> }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    setFileState(file);
  };
  return <input type="file" id="imageFile" name="imageFile" accept="image/*" onChange={handleFileChange} />;
};

export default FileUpload;
