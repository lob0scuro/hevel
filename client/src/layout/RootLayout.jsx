import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { useFlash } from "../utils/Context";

const RootLayout = () => {
  const { error } = useFlash();
  return (
    <>
      <Navbar />
      {error && <p className="error-message">{error}</p>}
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default RootLayout;
