import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "./AuthService"; // Import your service

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 1. Only track the USER, not their password input
  const [user, setUser] = useState(null);
  const [isAppLoading, setIsAppLoading] = useState(true); // Initial check

  useEffect(() => {
    // Check localStorage on load
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setIsAppLoading(false);
  }, []);

  // 2. Expose simpler methods that use your Service
  const login = async (email, password) => {
    const data = await authService.login({ email, password });
    setUser(data); // Save user to global state
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAppLoading }}>
      {!isAppLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);