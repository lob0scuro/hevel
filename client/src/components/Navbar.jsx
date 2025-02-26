import styles from "./Navbar.module.css";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../utils/Context";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={menuOpen ? styles.mobileHeader : styles.header}>
      <h1 className={menuOpen ? styles.mobileH1 : null}>
        <NavLink
          className={styles.navLogo}
          to="/"
          onClick={() => setMenuOpen(false)}
        >
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
