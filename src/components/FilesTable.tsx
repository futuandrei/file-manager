import React, { useState } from "react";
import DownloadButton from './DownloadButton';
import RenameFile from './RenameFile';
import sortFiles from "./Sorting";
import './Sorting.css';

interface FileEntry {
  id: string;
  name: string;
  file_size: number;
  type: string;
  extension: string;
  created_at: string;
  updated_at: string;
}

interface FilesTableProps {
  files: any[];
  handleTableUpdate: () => void;
  setFilteredFiles: (files: FileEntry[]) => void;
}

const FilesTable: React.FC<FilesTableProps> = ({ files, handleTableUpdate, setFilteredFiles }) => {
  const API_URL = import.meta.env.VITE_UNELMACLOUD_API_URL;
  const API_KEY = import.meta.env.VITE_UNELMACLOUD_API_KEY;
  const [deleting, setDeleting] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState("");

  const handleDelete = async (fileId: string) => {
    setDeleting(fileId);
    try {
      const response = await fetch(`${API_URL}/file-entries/${fileId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      await response.json();
      handleTableUpdate();
    } catch (error) {
      console.error("Deleting failed", error);
    } finally {
      setDeleting(null);
    }
  };

  const handleRename = async (fileId: string, newFileName: string) => {
    try {
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
      await response.json();
      handleTableUpdate();
      alert("File renamed successfully!");
    } catch (error) {
      console.error("Renaming failed", error);
      alert("Failed to rename the file. Please try again.");
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortOption(value);
    const sorted = sortFiles(files, value);
    setFilteredFiles(sorted);
  };

  return (
    <div>
      <div className="sort">
        <select value={sortOption} onChange={handleSortChange}>
          <option value="">Sort Files</option>
          <option value="name">Name</option>
          <option value="size">Size</option>
          <option value="lastModified">Last Modified</option>
          <option value="uploadDate">Upload Date</option>
          <option value="type">Type</option>
          <option value="extension">Extension</option>
        </select>
      </div>

      <h2>Files</h2>
      <table className="files-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Type</th>
            <th>Extension</th>
            <th>Upload Date</th>
            <th>Last Modified</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.id}>
              <td>{file.name}</td>
              <td>{(file.file_size / 1024).toFixed(2)} KB</td>
              <td>{file.type}</td>
              <td>{file.extension}</td>
              <td>{new Date(file.created_at).toLocaleDateString()}</td>
              <td>{new Date(file.updated_at).toLocaleDateString()}</td>
              <td className="menu">
                <RenameFile
                  currentFileName={file.name}
                  onRename={(newFileName) => handleRename(file.id, newFileName)}
                />
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

