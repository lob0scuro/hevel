import React from "react";

const Post = () => {
  return (
    <>
      <div className="postCard">
        <div className="postHeader">
          <h1>Post Title</h1>
          <h3>Post subtitle</h3>
        </div>
        <div className="postContent">
          <p>Post content</p>
        </div>
        <div className="postFooter">
          <p>Post categories</p>
          <p>Post date</p>
          <div className="postLinks">
            <p>link</p>
            <p>link</p>
            <p>link</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
