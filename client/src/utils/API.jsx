export const submitPost = async (formData) => {
  try {
    const response = await fetch("/api/create-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      return new Error("Problem with request: ", response.statusText);
    }
    const data = await response.json();
    return data.post_id;
  } catch (error) {
    console.error("Error", error);
    return error;
  }
};
