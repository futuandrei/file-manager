import React from "react";
// import FileUpload from "./components/FileUpload";
// import FilesTable from "./components/FilesTable";
import FileManager from "./components/FileManager";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <FileManager />
    </div>
  );
};

export default App;