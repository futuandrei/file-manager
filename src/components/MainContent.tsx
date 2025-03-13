import React from "react";
import FilesTable from "./FilesTable";
import "./MainContent.css";

interface MainContentProps {
    files: any[];
    handleTableUpdate: () => void;
}

const MainContent: React.FC<MainContentProps> = ({ files, handleTableUpdate }) => {
    return (
        <main className="main-content">
            {/* <h2>Files</h2> */}
            <FilesTable files={files} handleTableUpdate={handleTableUpdate} />
        </main>
    );
};

export default MainContent;