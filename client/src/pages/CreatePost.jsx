import React, { useState } from "react";
import Editor from "react-simple-wysiwyg";

const CreatePost = () => {
  const [data, setData] = useState();

  const onChange = (e) => {
    setData(e.target.value);
  };

  return (
    <>
      <Editor className="editor" value={data} onChange={onChange} />
      <button onClick={() => console.log(data)}>Submit</button>
    </>
  );
};

export default CreatePost;
