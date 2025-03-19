import React, { useState, useEffect } from "react";
import FilesTable from "./FilesTable";
import CreateFolder from "./CreateFolder";
import Breadcrumbs from "./Breadcrumbs";
import "./MainContent.css";

interface MainContentProps {
  allFiles: any[];
  files: any[];
  setFilteredFiles: (files: any[]) => void;
  handleTableUpdate: () => void;
}

const MainContent: React.FC<MainContentProps> = ({
  allFiles,
  files,
  setFilteredFiles,
  handleTableUpdate,
}) => {
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [breadcrumb, setBreadcrumb] = useState<
    { id: string | null; name: string }[]
  >([{ id: null, name: "All Files" }]);

  useEffect(() => {
    console.log("Current Folder ID:", currentFolderId);
    console.log("All Files:", allFiles);

    const filteredFiles = allFiles.filter(
      (file) => file.parent_id === currentFolderId
    );
    console.log("Filtered Files:", filteredFiles);
    setFilteredFiles(filteredFiles);
  }, [allFiles, currentFolderId, setFilteredFiles]);

  const handleFolderClick = (folderId: string, folderName: string) => {
    setCurrentFolderId(folderId);
    setBreadcrumb((prev) => {
      const existingIndex = prev.findIndex((crumb) => crumb.id === folderId);
      if (existingIndex !== -1) {
        return prev.slice(0, existingIndex + 1);
      }
      return [...prev, { id: folderId, name: folderName }];
    });

    // Log the contents of the folder
    const folderContents = allFiles.filter(
      (file) => file.parent_id === folderId
    );
    console.log("Contents of folder:", folderContents);
  };

  const handleBreadcrumbClick = (index: number) => {
    setCurrentFolderId(breadcrumb[index].id);
    setBreadcrumb(breadcrumb.slice(0, index + 1));
  };

  return (
    <main className="main-content">
      <h2>Files</h2>
      <Breadcrumbs
        breadcrumb={breadcrumb}
        onBreadcrumbClick={handleBreadcrumbClick}
      />
      <CreateFolder
        currentFolderId={currentFolderId}
        handleTableUpdate={handleTableUpdate}
      />
      <FilesTable
        files={files}
        handleTableUpdate={handleTableUpdate}
        onFolderClick={handleFolderClick}
      />
    </main>
  );
};

export default MainContent;
