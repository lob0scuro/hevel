import React from "react";
import { useAuth } from "../utils/Context";
import { Link } from "react-router-dom";

const AdminPage = () => {
  const { user } = useAuth();
  return (
    <>
      <h1>Welcome {user.first_name}</h1>
      <Link to="/create-post">Create Post</Link>
    </>
  );
};

export default AdminPage;
