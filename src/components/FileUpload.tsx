import React, { useState } from "react";
import axios from "axios";

interface FileUploadProps {
  handleTableUpdate: () => void; // Accept function as prop
}

const FileUpload: React.FC<FileUploadProps> = ({ handleTableUpdate }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  // Load API details from .env
  const API_URL = import.meta.env.VITE_UNELMACLOUD_API_URL;
  const API_KEY = import.meta.env.VITE_UNELMACLOUD_API_KEY;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a file first.");
      return;
    }

    setUploading(true);
    setMessage("");

    const formData = new FormData(); // Creating FormData object for file upload
    formData.append("file", selectedFile); // The file is appended to formData under the key "file".

    try {
      const response = await axios.post(
        API_URL + "/uploads", // Backend API endpoint
        formData, // The file to be uploaded
        {
          headers: {
            "Content-Type": "multipart/form-data", // Required for file uploads
            "Authorization": `Bearer ${API_KEY}`, // Authorization using API key
          },
        }
      );
      // Display a success message if the upload is successful
      setMessage("File uploaded successfully!");
      // ✅ Call handleTableUpdate after upload
      handleTableUpdate();
      console.log(response.data);
      // handleTableUpdate();
    } catch (error) {
      console.error("Upload failed", error);
      setMessage("Failed to upload file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Upload File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FileUpload;