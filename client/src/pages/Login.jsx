import React from "react";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const styles = {
    marginBottom: 20,
  };
  return (
    <>
      <h1 style={styles}>Login</h1>
      <LoginForm />
    </>
  );
};

export default Login;
