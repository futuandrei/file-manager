import React, { useState } from "react";
import DownloadButton from './DownloadButton'
import RenameFile from './RenameFile';
import DropDownMenu from "./DropDownMenu";

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

  const handleRename = async (fileId: string, newFileName: string) => {
    console.log(`Renaming file ${fileId} to: ${newFileName}`);
  
    try {
      // Make an API call to rename the file on the server
      const response = await fetch(`${API_URL}/file-entries/${fileId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({ name: newFileName }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("Rename response:", result);
      handleTableUpdate();
  
      // Provide feedback to the user
      alert("File renamed successfully!");
    } catch (error) {
      console.error("Renaming failed", error);
  
      // Provide feedback to the user
      alert("Failed to rename the file. Please try again.");
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
              <td className="menu">
                <DropDownMenu>
                  <DownloadButton
                    fileUrl={`${API_URL}/file-entries/${file.id}`}
                    fileName={file.name}
                    className="download-button"
                  />

                  <RenameFile 
                    currentFileName={file.name} 
                    onRename={(newFileName) => {
                      handleRename(file.id, newFileName);
                    }} 
                  />
    
                  <div>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(file.id)}
                      disabled={deleting === file.id}
                    >
                      {deleting === file.id ? "Deleting..." : "Remove"}
                    </button>
                  </div>

                </DropDownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );


};

export default FilesTable;