import axios from "axios";

export const fetchImages = async (query, page) => {
  try {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query, page, per_page: 12 },
      headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
      },
    });
    return response.data.results;
  } catch (error) {
    throw new Error("Failed to fetch images");
  }
};
