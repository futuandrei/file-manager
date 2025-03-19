import React, { useState, useEffect } from "react";
import FilesTable from "./FilesTable";
import CreateFolder from "./CreateFolder";
import Breadcrumbs from "./Breadcrumbs";
import "./MainContent.css";

interface MainContentProps {
  allFiles: any[];
  files: any[];
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
  return (
    <main className="main-content">
      <h2>Files</h2>
      <FilesTable
        files={files}
        handleTableUpdate={handleTableUpdate}
        setFilteredFiles={setFilteredFiles} 
      />
    </main>
  );
};

export default MainContent;
