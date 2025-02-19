import styles from "./EditPostForm.module.css";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { fetchPostById } from "../utils/Fetch";
import { useLocation, useNavigate } from "react-router-dom";

const EditPostForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state?.post;
  const from = location.state?.from || "/admin";

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      editable: false,
      title: post.title,
      subtitle: post.subtitle,
      content: post.content,
      category: post.category,
    },
  });

  const [edit, setEdit] = useState({
    title: false,
    subtitle: false,
    content: false,
    category: false,
  });

  const toggleEdit = (field) => {
    setEdit((prevEdit) => ({
      ...prevEdit,
      [field]: !prevEdit[field],
    }));
  };

  const onSubmit = async (data) => {
    const assurance = confirm("Confirm edit?");
    if (!assurance) {
      return;
    }
    try {
      const response = await fetch(`/api/edit-post/${post._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        alert(result.error);
        throw new Error("HTTP response was not ok: ", response.statusText);
      }
      alert(result.message);
      navigate(from);
    } catch (error) {
      console.error("There was an error: ", error);
    }
  };

  return (
    <form className={styles.editPostForm} onSubmit={handleSubmit(onSubmit)}>
      {/* TITLE BLOCK */}
      <div>
        {/* <label htmlFor="titleEditable">
          
        </label> */}
        {edit.title ? (
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <>
                <input {...field} />

                <button
                  className={styles.doneButton}
                  onClick={() => toggleEdit("title")}
                >
                  Done
                </button>
              </>
            )}
          />
        ) : (
          <div className={styles.editControllerDefault}>
            <p>Title: </p>
            <p onClick={() => toggleEdit("title")}>{watch("title")}</p>
          </div>
        )}
      </div>
      {/* SUBTITLE BLOCK */}
      <div>
        {edit.subtitle ? (
          <Controller
            name="subtitle"
            control={control}
            render={({ field }) => (
              <>
                <label>Subtitle: </label>
                <input {...field} />

                <button
                  className={styles.doneButton}
                  onClick={() => toggleEdit("subtitle")}
                >
                  Done
                </button>
              </>
            )}
          />
        ) : (
          <div className={styles.editControllerDefault}>
            <p>Subtitle: </p>
            <p onClick={() => toggleEdit("subtitle")}>{watch("subtitle")}</p>
          </div>
        )}
      </div>
      {/* CATEGORY BLOCK */}
      <div>
        {edit.category ? (
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <>
                <select id="category" {...field}>
                  <option value="">-- Choose category --</option>
                  <option value="Testing">Testing</option>
                  <option value="Theology">Theology</option>
                  <option value="Technology">Technology</option>
                  <option value="Hobby">Hobby</option>
                  <option value="Music">Music</option>
                  <option value="Journal">Journal</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Literature">Literature</option>
                  <option value="Parenting">Parenting</option>
                  <option value="DIY">DIY</option>
                </select>

                <button
                  className={styles.doneButton}
                  onClick={() => toggleEdit("category")}
                >
                  Done
                </button>
              </>
            )}
          />
        ) : (
          <div className={styles.editControllerDefault}>
            <p>Category: </p>
            <p onClick={() => toggleEdit("category")}>{watch("category")}</p>
          </div>
        )}
      </div>
      {/* CONTENT BLOCK */}
      <div>
        {edit.content ? (
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <>
                <textarea {...field}></textarea>
                <button
                  className={styles.doneButton}
                  onClick={() => toggleEdit("content")}
                >
                  Done
                </button>
              </>
            )}
          />
        ) : (
          <p onClick={() => toggleEdit("content")} className={styles.textArea}>
            {watch("content")}
          </p>
        )}
      </div>
      <button type="submit">Edit Post</button>
    </form>
  );
};

export default EditPostForm;
