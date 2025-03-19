import React, { useState } from "react";
import DownloadButton from "./DownloadButton";
import RenameFile from "./RenameFile";

interface FileEntry {
  id: string;
  name: string;
  size: number;
}

interface FilesTableProps {
  files: any[];
  handleTableUpdate: () => void;
  onFolderClick: (folderId: string, folderName: string) => void;
}

const FilesTable: React.FC<FilesTableProps> = ({
  files,
  handleTableUpdate,
  onFolderClick,
}) => {
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

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

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
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
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

  const handleRowClick = (file) => {
    if (file.type === "folder" && onFolderClick) {
      console.log("Folder Clicked in FilesTable.tsx:", file); // ✅ Debugging
      onFolderClick(file.id, file.name);
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
            <tr
              key={file.id}
              onClick={() => handleRowClick(file)}
              style={{ cursor: file.type === "folder" ? "pointer" : "default" }}
            >
              <td>
                {file.type === "folder" ? "📁 " : "📄 "}
                {file.name}
              </td>
              <td>{file.size}</td>
              <td className="menu">
                <RenameFile
                  currentFileName={file.name}
                  onRename={(newFileName) => handleRename(file.id, newFileName)}
                />
                {/* Pass files name and url link to download */}
                <DownloadButton
                  fileUrl={`${API_URL}/file-entries/${file.id}`}
                  fileName={file.name}
                  className="download-button"
                />
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(file.id)}
                  disabled={deleting === file.id}
                >
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
