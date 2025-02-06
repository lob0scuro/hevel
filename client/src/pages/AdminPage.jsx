import styles from "./AdminPage.module.css";
import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/Context";
import { Link } from "react-router-dom";
import { fetchAllPosts, deletePost } from "../utils/Fetch";
import AddPostForm from "../components/AddPostForm";

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
        <p>
          <b>{post.title}</b> - <i>{post.subtitle}</i>
        </p>
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
      <div className={styles.adminBlock}>
        {posts && (
          <div className={styles.postsBlock}>
            <h3>Posts</h3>
            <div className={styles.postList}>
              <ul>{renderPosts}</ul>
            </div>
          </div>
        )}

        <div className={styles.addPostForm}>
          <h3>Add Post</h3>
          <AddPostForm onPostCreated={postList} />
        </div>
      </div>
    </>
  );
};

export default AdminPage;
