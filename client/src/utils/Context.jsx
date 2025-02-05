import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();
const FlashContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const login = (data) => {
    setUser(data);
  };

  const logout = () => {
    setUser(null);
  };

  const flash = (msg) => {
    setError(msg);
    setTimeout(() => setError(null), 3000);
  };

  return (
    <AuthContext.Provider value={{ login, logout, user }}>
      <FlashContext.Provider value={{ error, flash }}>
        {children}
      </FlashContext.Provider>
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const useFlash = () => useContext(FlashContext);
