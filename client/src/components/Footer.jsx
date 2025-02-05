import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import React from "react";
import { useAuth } from "../utils/Context";

const Footer = () => {
  const { user, logout } = useAuth();
  return (
    <footer className={styles.footer}>
      <p>
        <b>HeVeL</b>
      </p>
      <p>created by: Cameron Lopez</p>
      {!user ? (
        <Link className={styles.loginButton} to="/login">
          Login
        </Link>
      ) : (
        <Link className={styles.loginButton} onClick={() => logout()}>
          Logout
        </Link>
      )}
    </footer>
  );
};

export default Footer;
