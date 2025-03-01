import React, { useEffect, useState } from "react";
import styles from "./Categories.module.css";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Post from "../components/PostTile";

const Categories = () => {
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (errorMessage) {
      const timeout = setTimeout(() => setErrorMessage(null), 4000);

      return () => clearTimeout(timeout); // Cleanup function
    }
  }, [errorMessage]);

  const options = [
    { value: "", label: "-- select category --" },
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

  const onSubmit = async (cat) => {
    const category = cat.category;
    if (!category) {
      return;
    }
    try {
      const response = await fetch(
        "/api/get-posts-by-category/" + encodeURIComponent(cat.category)
      );
      const data = await response.json();
      if (data.length === 0) {
        setErrorMessage(`No posts found in ${cat.category} category`);
        setPosts([]);
        return;
      }
      setPosts(data);
      setErrorMessage(null);
      console.log(data);
    } catch (error) {
      setPosts([]);
      console.error(error);
      setErrorMessage("Failed to fetch posts");
    }
  };

  const renderPosts = posts?.map((post) => {
    return <Post className={styles.post} id={post._id} key={post._id} />;
  });
  return (
    <>
      <h1 className={styles.categoriesHeader}>Search posts by category</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.catForm}>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select
              options={options}
              onChange={({ value }) => field.onChange(value)}
              className={styles.catController}
              isSearchable={false}
            />
          )}
        />
        <button type="submit " className={styles.subButton}>
          Submit
        </button>
      </form>
      {errorMessage && (
        <div className={styles.catError}>
          <p className="error-message">{errorMessage}</p>
        </div>
      )}
      {posts && <div className={styles.catPostList}>{renderPosts}</div>}
    </>
  );
};

export default Categories;
