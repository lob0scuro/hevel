import styles from "./Home.module.css";
import React, { useEffect, useState } from "react";
import bwImage from "../assets/images/hevel_bw.jpg";
import spiralImage from "../assets/images/hevel_spiral.jpg";
import sunriseImage from "../assets/images/hevel_sunrise.jpg";
import Post from "../components/Post";
import { fetchAllPosts } from "../utils/Fetch";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const data = await fetchAllPosts();
      setPosts(data);
    };
    fetchPost();
  }, []);
  return (
    <div className={styles.homeScreen}>
      <div className={styles.introBlock}>
        <img src={bwImage} alt="" width={75} />
        <img src={spiralImage} alt="" width={100} />
        <img src={sunriseImage} alt="" width={80} />
      </div>
      <div className={styles.postsBlock}>
        {posts.map((post) => (
          <Post key={post._id} id={post._id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
