import React from "react";
// import FileUpload from "./components/FileUpload";
// import FilesTable from "./components/FilesTable";
import FileManager from "./components/FileManager";

const App: React.FC = () => {
  return (
    <div>
      <h1>File manager</h1>
      <FileManager />
    </div>
  );
};

export default App;