import React from 'react';
import './DownloadButton.css'

interface DownloadProps {
  fileUrl: string;
  fileName: string;
  className?: string;
}

const DownloadButton: React.FC<DownloadProps> = ({ fileUrl, fileName, className }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <button onClick={handleDownload} className={className}>
      Download
      </button>
    </div>

  );
};

export default DownloadButton;