import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Login from "./components/Login";
import "./App.css";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [files, setFiles] = useState<any[]>([]); // ✅ Stores all files
  const [filteredFiles, setFilteredFiles] = useState<any[]>([]); // ✅ Stores filtered files

  const API_URL = import.meta.env.VITE_UNELMACLOUD_API_URL;
  const API_KEY = import.meta.env.VITE_UNELMACLOUD_API_KEY;

  const handleTableUpdate = async () => {
    try {
      const response = await axios.get(`${API_URL}/drive/file-entries`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });

      setFiles(response.data.data); // ✅ Store original full file list
      setFilteredFiles(response.data.data); // ✅ Ensure filteredFiles starts with full list
    } catch (error) {
      console.error("Fetching files failed", error);
    }
  };

  useEffect(() => {
    handleTableUpdate();
  }, []);


  return (
    <div className="app-container">
      {!isLoggedIn ? (
        <Login onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <>
          <Header allFiles={files} setFilteredFiles={setFilteredFiles} />
          <Sidebar handleTableUpdate={handleTableUpdate} />
          <MainContent
            allFiles={files}
            files={filteredFiles}
            setFilteredFiles={setFilteredFiles}
            handleTableUpdate={handleTableUpdate}
          />
        </>
      )}
    </div>
  );
};

export default App;
