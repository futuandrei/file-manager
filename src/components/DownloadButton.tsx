import React from 'react';
import './DownloadButton.css'
import { FaDownload } from 'react-icons/fa'; // Import the download icon

interface DownloadProps {
  fileUrl: string; // URL of the file to download
  fileName: string; // Name of the file to be downloaded
  className?: string; // Optional class for styling
}

const DownloadButton: React.FC<DownloadProps> = ({ fileUrl, fileName, className }) => {
  const handleDownload = () => {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName; // Set the file name for the download
    document.body.appendChild(link);
    link.click(); // Trigger the download
    document.body.removeChild(link); // Clean up
  };

  return (
    <button onClick={handleDownload} className={className}>
      <FaDownload />
    </button>
  );
};

export default DownloadButton;