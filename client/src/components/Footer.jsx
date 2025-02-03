import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import React from "react";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        <b>HeVeL</b>
      </p>
      <p>created by: Cameron Lopez</p>
      <Link className={styles.loginButton} to="/login">
        Login
      </Link>
    </footer>
  );
};

export default Footer;
