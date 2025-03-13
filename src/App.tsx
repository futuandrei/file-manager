import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import "./App.css";

const App: React.FC = () => {
  const [files, setFiles] = useState([]);

  const API_URL = import.meta.env.VITE_UNELMACLOUD_API_URL;
  const API_KEY = import.meta.env.VITE_UNELMACLOUD_API_KEY;

  const handleTableUpdate = async () => {
    try {
      const response = await axios.get(`${API_URL}/drive/file-entries`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });
      setFiles(response.data.data);
    } catch (error) {
      console.error("Fetching files failed", error);
    }
  };

  useEffect(() => {
    handleTableUpdate(); // Fetch files when App loads
  }, []);

  return (
    <div className="app-container">
      <Header />
      <Sidebar handleTableUpdate={handleTableUpdate} />
      <MainContent files={files} handleTableUpdate={handleTableUpdate} />
    </div>
  );
};

export default App;