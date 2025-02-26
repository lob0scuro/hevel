import styles from "./Navbar.module.css";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../utils/Context";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={menuOpen ? styles.mobileHeader : styles.header}>
      <h1 className={menuOpen && styles.mobileH1}>
        <NavLink className={styles.navLogo} to="/">
          HeVeL
        </NavLink>
      </h1>
      <GiHamburgerMenu
        onClick={toggleMenu}
        className={menuOpen ? styles.hm : styles.closedHm}
      />
      <nav className={menuOpen && styles.mobileNav}>
        {!user ? (
          <>
            <NavLink to="/about" onClick={() => setMenuOpen(false)}>
              About
            </NavLink>
            <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/admin" onClick={() => setMenuOpen(false)}>
              Dashboard
            </NavLink>
            <NavLink to="/create-post" onClick={() => setMenuOpen(false)}>
              Add Post
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
