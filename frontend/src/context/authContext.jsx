import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("/api/auth/profile");
        setUser(res.data);
      } catch (err) {
        setUser(null);
      }
      setDataLoaded(true);
    };
    getUser();
  }, []);

  const login = async (email, password) => {
    const res = await axios.post("/api/auth/login", { email, password });
    setUser(res.data.user);
    localStorage.setItem("loggedIn", true);
    navigate("/dashboard");
  };

  const register = async (name, email, password) => {
    const res = await axios.post("/api/auth/register", {
      name,
      email,
      password,
    });
    setUser(res.data.user);
    localStorage.setItem("loggedIn", true);
    navigate("/dashboard");
  };

  const logout = async () => {
    await axios.post("/api/auth/logout");
    setUser(null);
    localStorage.setItem("loggedIn", false);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        dataLoaded,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
