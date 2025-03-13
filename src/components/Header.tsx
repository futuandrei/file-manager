import React from "react";
import "./Header.css"; // Import styling
import logo from "../assets/logo.png";

const Header: React.FC = () => {
    return (
        <header className="header">
            {/* Logo */}
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>

            {/* Search Bar */}
            <div className="search-bar">
                <input type="text" placeholder="Search files..." />
            </div>
        </header>
    );
};

export default Header;