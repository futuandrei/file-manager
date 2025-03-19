import React from "react";
import axios from "axios";

interface CreateFolderProps {
  currentFolderId: string | null; // Parent folder ID
  handleTableUpdate: () => void; // Function to refresh file list
}

const API_URL = import.meta.env.VITE_UNELMACLOUD_API_URL;
const API_KEY = import.meta.env.VITE_UNELMACLOUD_API_KEY;

const CreateFolder: React.FC<CreateFolderProps> = ({
  currentFolderId,
  handleTableUpdate,
}) => {
  const createFolder = async () => {
    const folderName = prompt("Enter folder name:")?.trim();
    if (!folderName) {
      alert("Folder name cannot be empty.");
      return;
    }

    try {
      const requestBody = JSON.stringify({
        name: folderName,
        parentId: currentFolderId ? currentFolderId : null,
      });

      console.log("Sending request:", requestBody);

      await axios.post(`${API_URL}/folders`, requestBody, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      });

      handleTableUpdate(); // Refresh file list after creation
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };

  return <button onClick={createFolder}>➕ New Folder</button>;
};

export default CreateFolder;
