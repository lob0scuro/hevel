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

export const fetchPostById = async (id) => {
  try {
    const response = await fetch("/api/get-post/" + id);
    if (!response.ok) {
      throw new Error("HTTP response was not ok: " + response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("There was an error: ", error);
  }
};

export const deletePost = async (id, postList) => {
  const assure = confirm("Delete this post?");
  if (!assure) {
    return;
  }
  try {
    const response = await fetch(`/api/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Error: " + response.statusText);
    }
    postList();
    return data;
  } catch (error) {
    console.error("Error in fetch: ", error);
  }
};
