import styles from "./AddPostForm.module.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Editor from "react-simple-wysiwyg";

const AddPostForm = ({ onPostCreated }) => {
  const [contentData, setContentData] = useState("hello");

  const onChange = (e) => {
    setContentData(e.target.value);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/create-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create post");
      }
      alert("Post created successfully!");
      reset();
      onPostCreated();
    } catch (error) {
      console.error("Error: ", error);
      alert(error.message);
    }
  };

  return (
    <form className={styles.addPostForm} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <p className="error-message">{errors.title.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="subtitle">Subtitle:</label>
        <input type="text" {...register("subtitle")} />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <input type="text" {...register("category")} />
      </div>
      <div>
        <label htmlFor="content">Content:</label>

        <textarea
          rows="5"
          {...register("content", { required: "Content is required" })}
        ></textarea>
        {errors.content && (
          <p className="error-message">{errors.content.message}</p>
        )}
      </div>

      <button type="submit">Create Post</button>
    </form>
  );
};

export default AddPostForm;
