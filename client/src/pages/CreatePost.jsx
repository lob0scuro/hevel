import React, { useState } from "react";
import Editor from "react-simple-wysiwyg";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import styles from "./CreatePost.module.css";
import { submitPost } from "../utils/API";

const CreatePost = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const options = [
    { value: "Testing", label: "Testing" },
    { value: "Theology", label: "Theology" },
    { value: "Technology", label: "Technology" },
    { value: "Hobby", label: "Hobby" },
    { value: "Music", label: "Music" },
    { value: "Journal", label: "Journal" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Literature", label: "Literature" },
    { value: "Parenting", label: "Parenting" },
    { value: "DIY", label: "DIY" },
  ];

  const onSubmit = (data) => {
    submitPost(data);
    reset();
  };

  return (
    <>
      <h1 className={styles.addPostHeader}>Add Post</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.addPostForm}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" {...register("title", { required: true })} />
          {errors.title && <p className="error-message">Title is required</p>}
        </div>
        <div>
          <label htmlFor="subtitle">Subtitle</label>
          <input type="text" {...register("subtitle", { required: true })} />
          {errors.subtitle && (
            <p className="error-message">Subtitle is required</p>
          )}
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={options}
                className={styles.categorySelect}
                onBlur={field.onBlur}
                onChange={(selectedOption) =>
                  field.onChange(selectedOption?.value)
                }
                value={options.find((option) => option.value === field.value)}
              />
            )}
          />
        </div>
        <div className={styles.editorDiv}>
          <label htmlFor="content">Content</label>
          <Controller
            name="content"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Editor
                className={styles.editor}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <button className={styles.subButton}>Submit</button>
      </form>
    </>
  );
};

export default CreatePost;
