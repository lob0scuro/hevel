import React from "react";
import { useAuth } from "../utils/Context";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
