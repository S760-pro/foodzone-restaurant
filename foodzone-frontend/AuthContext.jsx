import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, restore session from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("fz_user");
    const token = localStorage.getItem("fz_token");
    if (stored && token) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  // ── Register ──
  const register = async (formData) => {
    const data = await authAPI.register(formData);
    const userObj = {
      _id: data._id,
      name: data.name,
      email: data.email,
      role: data.role,
      phone: data.phone,
    };
    localStorage.setItem("fz_token", data.token);
    localStorage.setItem("fz_user", JSON.stringify(userObj));
    setUser(userObj);
    return data;
  };

  // ── Login ──
  const login = async (formData) => {
    const data = await authAPI.login(formData);
    const userObj = {
      _id: data._id,
      name: data.name,
      email: data.email,
      role: data.role,
      phone: data.phone,
    };
    localStorage.setItem("fz_token", data.token);
    localStorage.setItem("fz_user", JSON.stringify(userObj));
    setUser(userObj);
    return data;
  };

  // ── Logout ──
  const logout = () => {
    localStorage.removeItem("fz_token");
    localStorage.removeItem("fz_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
