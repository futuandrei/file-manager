import React, { useEffect, useState } from "react";
import axios from "axios";

interface ThumbnailProps {
  fileId: string;
}

const ThumbnailDisplay: React.FC<ThumbnailProps> = ({ fileId }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Load API details from .env
  const API_URL = import.meta.env.VITE_UNELMACLOUD_API_URL;
  const API_KEY = import.meta.env.VITE_UNELMACLOUD_API_KEY;



  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/file-entries/${fileId}`, {
          headers: {
            Authorization: `Bearer ${API_KEY}`, // ✅ Include API Key in the request
          },
          responseType: "blob", // ✅ Expect an image file
        });

        // 🔍 Debugging: Check if the response is actually an image or an error page
        const text = await response.data.text();
        console.log("Response Body:", text); // 🛠️ Log to see what the server returns

        console.log("Image API response:", response);
        console.log("API Response:", response.data);

        const imageUrl = URL.createObjectURL(response.data);
        setImageUrl(imageUrl);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [fileId]);

  return imageUrl ? (
    <img src={imageUrl} alt="Thumbnail" width="100" />
  ) : (
    <p>Loading...</p>
  );
};

export default ThumbnailDisplay;