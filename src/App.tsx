import React from "react";
import FileUpload from "./components/FileUpload";

const App: React.FC = () => {
  return (
    <div>
      <h1>File manager</h1>
      <FileUpload />
    </div>
  );
};

export default App;