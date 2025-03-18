import React, { useState } from "react";
import "./Header.css";
import logo from "../assets/logo.png";
import Search from "./Search";

interface HeaderProps {
  allFiles: any[];
  setFilteredFiles: (files: any[]) => void;
}

const Header: React.FC<HeaderProps> = ({ allFiles, setFilteredFiles }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search files..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded w-full mb-4"
        />

        <Search
          allFiles={allFiles}
          searchQuery={searchQuery}
          setFilteredFiles={setFilteredFiles}
        />
      </div>
      <button
        className="logout-button"
        onClick={() => window.location.reload()}
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
