
const fetchData = async (query = "", maxResults = 10) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/search?part=snippet&type=video&maxResults=${maxResults}&q=${query}&key=${import.meta.env.VITE_API_KEY}`
    );
    if (response.status !== 200)
      throw new Error("Failed to fetch data from YouTube API");

    const data = await response.json();
    
    return data.items;
  } catch (error) {
    console.error("Error fetching data from YouTube API:", error);
    throw error;
  }
};

export { fetchData };
