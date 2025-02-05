import styles from "./PostPage.module.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../utils/Fetch";
import { formatDate } from "../utils/Formatter";

const PostCard = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      const data = await fetchPostById(id.toString());
      setPost(data);
    };
    fetchPost();
  }, [id]);

  return (
    <div className={styles.post}>
      <div className={styles.postHeader}>
        <h1>{post.title}</h1>
        <p className={styles.postSubtitle}>
          <b>{post.subtitle}</b>
        </p>
      </div>
      <p className={styles.postContent}>{post.content}</p>
      <div className={styles.postFooter}>
        <p className={styles.postCategory}>{post.category}</p>
        <p className={styles.postDate}>{formatDate(post.created_on)}</p>
      </div>
    </div>
  );
};

export default PostCard;
