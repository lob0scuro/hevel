import { useNavigate } from "react-router-dom";
import { useAuth, useFlash } from "../utils/Context";
import styles from "./Login.module.css";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const { login } = useAuth();
  const { flash } = useFlash();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
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
        return response.json();
      })
      .then((data) => {
        console.log(data.user);
        login(data.user);
        navigate("/admin");
      })
      .catch((error) => {
        flash(error.message);
        console.error(error.error);
      });
  };

  return (
    <>
      <h1 className={styles.loginHeader}>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
        <div>
          <label htmlFor="user">Username: </label>
          <input type="text" {...register("username", { required: true })} />
          {errors.username && (
            <p className={styles.errorField}>Username required</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className={styles.errorField}>Password required</p>
          )}
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </>
  );
};

export default Login;
