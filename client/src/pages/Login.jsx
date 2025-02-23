import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/Context";
import styles from "./Login.module.css";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          alert("invalid username or password, please try again.");
          reset();
          return;
        }
        return response.json();
      })
      .then((data) => {
        login(data.user);
        navigate("/admin");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <h1 className={styles.loginHeader}>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
        <div>
          <label htmlFor="user">Username</label>
          <input type="text" {...register("username", { required: true })} />
          {errors.username && (
            <p className="error-message">* username required</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="error-message">* password required</p>
          )}
        </div>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default Login;
