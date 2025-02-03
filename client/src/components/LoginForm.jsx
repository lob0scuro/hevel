import styles from "./LoginForm.module.css";
import React from "react";

const LoginForm = () => {
  return (
    <form action="#" className={styles.loginForm}>
      <div>
        <label htmlFor="user">
          Username: <input type="text" />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password: <input type="password" name="password" id="password" />
        </label>
      </div>
      <div>
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
};

export default LoginForm;
