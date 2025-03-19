import React, { useState } from "react";
import FilesTable from "./FilesTable";
import Breadcrumbs from "./Breadcrumbs";
import CreateFolder from "./CreateFolder";
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
  setFilteredFiles,
}) => {
  const [breadcrumb, setBreadcrumb] = useState<{ id: string | null; name: string }[]>([
    { id: null, name: "Root" },
  ]);

  const handleBreadcrumbClick = (index: number) => {
    setBreadcrumb(breadcrumb.slice(0, index + 1));
    // Optionally trigger table refresh here
    handleTableUpdate();
  };

  return (
    <main className="main-content">
      <Breadcrumbs
        breadcrumb={breadcrumb}
        onBreadcrumbClick={handleBreadcrumbClick}
      />
      <CreateFolder
        currentFolderId={
          breadcrumb[breadcrumb.length - 1]
            ? breadcrumb[breadcrumb.length - 1].id
            : null
        }
        handleTableUpdate={handleTableUpdate}
      />
      <FilesTable
        files={files}
        handleTableUpdate={handleTableUpdate}
        setFilteredFiles={setFilteredFiles}
      />
    </main>
  );
};

export default MainContent;
