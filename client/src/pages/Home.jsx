import styles from "./Home.module.css";
import React, { useEffect, useState } from "react";
import bwImage from "../assets/images/hevel_bw.jpg";
import spiralImage from "../assets/images/hevel_spiral.jpg";
import sunriseImage from "../assets/images/hevel_sunrise.jpg";
import Post from "../components/PostTile";
import { fetchAllPosts } from "../utils/Fetch";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const data = await fetchAllPosts();
      console.log("Fetched posts: ", data);
      setPosts(data);
    };
    fetchPost();
  }, []);
  return (
    <div className={styles.homeScreen}>
      <div className={styles.imageBlock}>
        <img src={bwImage} className={styles.image1} alt="" />
        <img src={spiralImage} className={styles.image2} alt="" />
        <img src={sunriseImage} className={styles.image3} alt="" />
      </div>
      {posts && (
        <div className={styles.postsBlock}>
          {posts.map((post) => (
            <Post key={post._id} id={post._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
