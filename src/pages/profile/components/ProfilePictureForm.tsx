import FileUpload from 'components/FileUpload';
import React, { useState } from 'react';

const ProfilePictureForm = () => {
  const [fileState, setFileState] = useState<File | undefined>(undefined);
  return (
    <>
      <FileUpload setFileState={setFileState} />
    </>
  );
};

export default ProfilePictureForm;
