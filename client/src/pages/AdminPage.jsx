import styles from "./AdminPage.module.css";
import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/Context";
import { Link } from "react-router-dom";
import { fetchAllPosts, deletePost } from "../utils/Fetch";

const AdminPage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState(null);

  //send this function to update the 'const posts' to rerender the cpmponent
  const postList = async () => {
    const data = await fetchAllPosts();
    setPosts(data);
  };

  useEffect(() => {
    postList();
  }, []);

  const renderPosts = posts?.map((post) => {
    return (
      <li key={post._id}>
        <h3>
          <b>{post.title}</b> - <i>{post.subtitle}</i>
        </h3>
        <p>{post.created_on}</p>
        <div>
          <Link to={`/post/${post._id}`}>view</Link>
          <button onClick={() => deletePost(post._id, postList)}>del</button>
        </div>
      </li>
    );
  });

  return (
    <>
      <h1 className={styles.adminHeader}>Welcome, {user.first_name}</h1>
      {posts ? (
        <div className={styles.postList}>
          <ul>{renderPosts}</ul>
        </div>
      ) : (
        <h3>No Posts to show</h3>
      )}
    </>
  );
};

export default AdminPage;
