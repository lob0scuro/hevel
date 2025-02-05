import styles from "./PostTile.module.css";
import React, { useEffect, useState } from "react";
import { formatDate } from "../utils/Formatter";
import { Link } from "react-router-dom";

const Post = (props) => {
  const [post, setPost] = useState({});

  useEffect(() => {
    fetch("/api/get-post/" + props.id)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPost(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [props.id]);

  return (
    <>
      <div className={styles.postTile}>
        <div className={styles.postHeader}>
          <h1>{post.title}</h1>
          <p className={styles.postSubtitle}>
            <b>{post.subtitle}</b>
          </p>
        </div>
        <div className={styles.postFooter}>
          <div className={styles.postFooterDetails}>
            <p className={styles.categoryTile}>{post.category}</p>
            <p className={styles.postDate}>{formatDate(post.created_on)}</p>
          </div>
          <Link
            to={`/post/${post._id}`}
            className={styles.postFooterViewButton}
          >
            View Post
          </Link>
        </div>
      </div>
    </>
  );
};

export default Post;
