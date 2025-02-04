export const fetchAllPosts = async () => {
  try {
    const response = await fetch("/api/get-posts");
    if (!response.ok) {
      throw new Error("HTTP Response was not ok" + response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error: " + error);
  }
};
