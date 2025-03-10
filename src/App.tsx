import React from "react";
import FileUpload from "./components/FileUpload";
import FilesTable from "./components/FilesTable";

const App: React.FC = () => {
  return (
    <div>
      <h1>File manager</h1>
      <FileUpload />
      <FilesTable />
    </div>
  );
};

export default App;