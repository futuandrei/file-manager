import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import './RenameFile.css'

interface RenameFileProps {
  currentFileName: string;
  onRename: (newFileName: string) => void;
}

const RenameFile: React.FC<RenameFileProps> = ({ currentFileName, onRename }) => {
  const [newFileName, setNewFileName] = useState<string>(currentFileName);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleRename = () => {
    if (newFileName.trim() !== '') {
      onRename(newFileName);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setNewFileName(currentFileName);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            placeholder="Enter new file name"
          />
          <button onClick={handleRename}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div className='toggle-class'>
          <button onClick={() => setIsEditing(true)} className='toggle-button'>
            Rename
          </button>
        </div>
      )}
    </div>
  );
};

export default RenameFile;