import React from "react";
import bwImage from "../assets/images/hevel_bw.jpg";
import spiralImage from "../assets/images/hevel_spiral.jpg";
import sunriseImage from "../assets/images/hevel_sunrise.jpg";
const Home = () => {
  return (
    <>
      <div className="">
        <img src={bwImage} alt="" width={125} />
        <img src={spiralImage} alt="" width={250} />
        <img src={sunriseImage} alt="" width={145} />
      </div>
      <h1>
        Welcome to <span>HeVeL</span>
      </h1>
    </>
  );
};

export default Home;
