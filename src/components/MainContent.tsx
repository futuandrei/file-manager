import React from "react";
import FilesTable from "./FilesTable";
import "./MainContent.css";

interface MainContentProps {
  allFiles: any[]; // ✅ The full original file list
  files: any[]; // ✅ Filtered files
  setFilteredFiles: (files: any[]) => void;
  handleTableUpdate: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ files, handleTableUpdate }) => {
  return (
    <main className="main-content">
      <h2>Files</h2>

      {/* ✅ Only show the filtered files in the table */}
      <FilesTable files={files} handleTableUpdate={handleTableUpdate} />
    </main>
  );
};

export default MainContent;
