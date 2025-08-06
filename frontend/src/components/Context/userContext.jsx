import React, { createContext, useContext, useState, useEffect } from "react";

// 1️⃣ Create the context
const UserContext = createContext();

// 2️⃣ Create the provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Restore user from localStorage on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("userId");
    const role = localStorage.getItem("role");

    if (token && id && role) {
      setUser({
        id,
        token,
        role,
      });
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
    localStorage.setItem("role", userData.role);
    localStorage.setItem("userId", userData.id);
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// 3️⃣ Custom hook for easy usage
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used inside a UserProvider");
  return context;
};