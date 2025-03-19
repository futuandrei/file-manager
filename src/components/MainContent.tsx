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
  const [breadcrumb, setBreadcrumb] = useState<
    { id: string | null; name: string }[]
  >([{ id: null, name: "All Files" }]);

  const handleFolderClick = (folderId: string, folderName: string) => {
    setCurrentFolderId(folderId);
    setBreadcrumb((prev) => [...prev, { id: folderId, name: folderName }]);
  };

  const handleBreadcrumbClick = (index: number) => {
    setCurrentFolderId(breadcrumb[index].id);
    setBreadcrumb(breadcrumb.slice(0, index + 1));
  };

  return (
    <main className="main-content">
      <h2>Files</h2>

      {/* ✅ Use Breadcrumbs component */}
      <Breadcrumbs
        breadcrumb={breadcrumb}
        onBreadcrumbClick={handleBreadcrumbClick}
      />

      {/* ✅ New Folder Button using CreateFolder component */}
      <CreateFolder
        currentFolderId={currentFolderId}
        handleTableUpdate={handleTableUpdate}
      />
      {/* ✅ Only show the filtered files in the table */}
      <FilesTable
        files={files}
        handleTableUpdate={handleTableUpdate}
        onFolderClick={handleFolderClick}
      />
    </main>
  );
};

export default MainContent;
