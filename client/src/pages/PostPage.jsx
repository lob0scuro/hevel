import styles from "./PostPage.module.css";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { fetchPostById } from "../utils/Fetch";
import { useAuth } from "../utils/Context";
import DOMPurify from "dompurify";

const PostCard = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const fetchPost = async () => {
      const data = await fetchPostById(id.toString());
      setPost(data);
    };
    fetchPost();
  }, [id]);

  if (!post) return <p>Loading.... </p>;

  return (
    <div className={styles.post}>
      <div className={styles.postHeader}>
        <h1>{post.title}</h1>
        <p className={styles.postSubtitle}>
          <b>{post.subtitle}</b>
        </p>
      </div>
      <hr />
      <br />
      <br />
      <div
        className={styles.postContent}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
      />
      <div className={styles.postFooter}>
        <p className={styles.postDate}>{post.created_on}</p>
        <p className={styles.postCategory}>{post.category}</p>
      </div>
      {user && (
        <Link
          to={`/edit-post/${post._id}`}
          state={{ post: post, from: location.pathname }}
          className={styles.navToEditButton}
        >
          Edit Post
        </Link>
      )}
    </div>
  );
};

export default PostCard;
