import styles from "./Navbar.module.css";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../utils/Context";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className={styles.header}>
      <h1>HeVeL</h1>
      <nav>
        {!user ? (
          <>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/admin">Dashboard</NavLink>
            <NavLink to="/create-post">Add Post</NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
