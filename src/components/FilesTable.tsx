import React, { useState, useEffect } from "react";
import axios from "axios";
// import ThumbnailDisplay from "./ThumbnailDisplay";

interface FileEntry {
  id: string;
  name: string;
  size: number;
}

const FilesTable: React.FC = () => {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");

  // Load API details from .env
  const API_URL = import.meta.env.VITE_UNELMACLOUD_API_URL;
  const API_KEY = import.meta.env.VITE_UNELMACLOUD_API_KEY;

  const handleTableUpdate = async () => {

    setUpdating(true);
    setMessage("");

    try {
      const response = await axios.get(`${API_URL}/drive/file-entries`, {
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
        },
      });

      setFiles(response.data.data);
      setMessage("Files updated successfully!");
    } catch (error) {
      console.error("Fetching files failed", error);
      setMessage("Failed to get files.");
    } finally {
      setUpdating(false);
    }
  };

  // ✅ Automatically fetch files when the component loads
  useEffect(() => {
    handleTableUpdate();
  }, []); // Runs only on component mount

  // ✅ Poll for updates every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleTableUpdate();
    }, 10000); // Fetch files every 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Handle delete (with Fetch, not Axios)
  const handleDelete = async (fileId: string) => {
    console.log("Deleting file with ID:", fileId);

    try {
      const response = await fetch(`${API_URL}/file-entries/${fileId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      console.log("Delete response:", await response.json());

      // Remove file from UI after successful deletion
      setFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
      setMessage("File deleted successfully!");
    } catch (error) {
      console.error("Deleting failed", error);
      // setMessage(error.message || "Failed to delete file.");
    }
  };


  return (
    <div>
      <h2>Files</h2>
      <button onClick={handleTableUpdate} disabled={updating}>
        {updating ? "Updating..." : "Update"}
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          {/* File list will be displayed here */}
          {files.map((file) => (
            <tr key={file.id}>
              <td>{file.name}</td>
              <td>{file.size}</td>
              {/* <td><ThumbnailDisplay fileId={file.id} /></td> */}
              <button onClick={() => handleDelete(file.id)} disabled={updating}>
                {updating ? "Deleting..." : "Delete"}
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );


};

export default FilesTable;