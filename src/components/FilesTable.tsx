import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ThumbnailDisplay from "./ThumbnailDisplay";
import "./FileManager.css";

interface FileEntry {
  id: string;
  name: string;
  size: number;
}

interface FilesTableProps {
  files: FileEntry[];
  handleTableUpdate: () => void;
}

const FilesTable: React.FC<FilesTableProps> = ({ files, handleTableUpdate }) => {
  // Load API details from .env
  const API_URL = import.meta.env.VITE_UNELMACLOUD_API_URL;
  const API_KEY = import.meta.env.VITE_UNELMACLOUD_API_KEY;

  const [deleting, setDeleting] = useState<string | null>(null);

  // Handle delete (with Fetch, not Axios)
  const handleDelete = async (fileId: string) => {
    console.log("Deleting file with ID:", fileId);

    setDeleting(fileId);

    try {
      const response = await fetch(`${API_URL}/file-entries/${fileId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      console.log("Delete response:", await response.json());

      // ✅ Call handleTableUpdate after delete
      handleTableUpdate();
    } catch (error) {
      console.error("Deleting failed", error);
    } finally {
      setDeleting(null);
    }
  };



  return (
    <div>
      <h2>Files</h2>
      <table className="files-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* File list will be displayed here */}
          {files.map((file) => (
            <tr key={file.id}>
              <td>{file.name}</td>
              <td>{file.size}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(file.id)} disabled={deleting === file.id}>
                  {deleting === file.id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );


};

export default FilesTable;