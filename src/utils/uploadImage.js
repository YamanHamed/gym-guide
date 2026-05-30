import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Uploads an image file to the backend and returns the CDN URL.
 * @param {File} imageFile - The image file to upload.
 * @returns {Promise<string>} - The CDN URL of the uploaded image.
 */

export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await axios.post(`${API_BASE}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.url; // assumes backend returns { url: "..." }
  } catch (error) {
    console.error("Image upload error:", error);
    throw error;
  }
};
