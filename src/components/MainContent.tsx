import React from "react";
import FilesTable from "./FilesTable";
import CreateFolder from "./CreateFolder"; // ✅ Import the new component
import Breadcrumbs from "./Breadcrumbs";
import { useState } from "react";
import "./MainContent.css";

interface MainContentProps {
  allFiles: any[]; // ✅ The full original file list
  files: any[]; // ✅ Filtered files
  setFilteredFiles: (files: any[]) => void;
  handleTableUpdate: () => void;
}

const MainContent: React.FC<MainContentProps> = ({
  files,
  handleTableUpdate,
}) => {
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null); // Track current folder
  return (
    <main className="main-content">
      <h2>Files</h2>

      {/* ✅ New Folder Button using CreateFolder component */}
      <CreateFolder
        currentFolderId={currentFolderId}
        handleTableUpdate={handleTableUpdate}
      />
      {/* ✅ Only show the filtered files in the table */}
      <FilesTable files={files} handleTableUpdate={handleTableUpdate} />
    </main>
  );
};

export default MainContent;
