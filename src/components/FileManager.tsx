import React, { useState, useEffect } from "react";
import axios from "axios";
import FilesTable from "./FilesTable";
import FileUpload from "./FileUpload";

const FileManager: React.FC = () => {
    const [files, setFiles] = useState([]); // Manage files in parent

    const API_URL = import.meta.env.VITE_UNELMACLOUD_API_URL;
    const API_KEY = import.meta.env.VITE_UNELMACLOUD_API_KEY;

    const handleTableUpdate = async () => {
        try {
            const response = await axios.get(`${API_URL}/drive/file-entries`, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                },
            });
            setFiles(response.data.data); // Update file list
        } catch (error) {
            console.error("Fetching files failed", error);
        }
    };

    // Fetch files on component mount
    useEffect(() => {
        handleTableUpdate();
    }, []);

    return (
        <div>
            <h2>File Manager</h2>
            {/* Pass handleTableUpdate to FileUpload */}
            <FileUpload handleTableUpdate={handleTableUpdate} />
            {/* Pass files & handleTableUpdate to FilesTable */}
            <FilesTable files={files} handleTableUpdate={handleTableUpdate} />
        </div>
    );
};

export default FileManager;