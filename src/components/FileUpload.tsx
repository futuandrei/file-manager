import React, { useState } from "react";
import axios from "axios";

const FileUpload: React.FC = () => {
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

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
        const response = await axios.post(
            API_URL + "/uploads",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${API_KEY}`, // Replace with actual token
              },
            }
          );
      setMessage("File uploaded successfully!");
      console.log(response.data);
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