import React, { useState } from "react";
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
  files,
  handleTableUpdate,
}) => {
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
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

  const filteredFiles = files.filter(
    (file) => file.parentId === currentFolderId
  );

  return (
    <main className="main-content">
      <h2>Files</h2>

      {/* ✅ Use Breadcrumbs component */}
      <Breadcrumbs
        breadcrumb={breadcrumb}
        onBreadcrumbClick={handleBreadcrumbClick}
      />

      {/* ✅ New Folder Button */}
      <CreateFolder
        currentFolderId={currentFolderId}
        handleTableUpdate={handleTableUpdate}
      />

      {/* ✅ Display filtered files */}
      <FilesTable
        files={filteredFiles}
        handleTableUpdate={handleTableUpdate}
        onFolderClick={handleFolderClick}
      />
    </main>
  );
};

export default MainContent;
