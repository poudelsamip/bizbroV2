import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [regError, setRegError] = useState(null);

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
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem("loggedIn", true);
        navigate("/dashboard");
      } else {
        throw new Error();
      }
    } catch (error) {
      throw error;
    }
  };

  const sendVerificationCode = async (
    email,
    action,
    name = "",
    password = ""
  ) => {
    try {
      const response = await axios.post("/api/auth/sendcode", {
        email,
        name,
        password,
        action,
      });
      if (!response.data.success) {
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const register = async (name, email, password, code) => {
    try {
      const response = await axios.post("/api/auth/verifycode", {
        email,
        code,
      });
      if (response.data.verified !== true) {
        throw new Error("verification failed");
      }
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      setUser(res.data.user);
      localStorage.setItem("loggedIn", true);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const verifyEmailCode = async (email, code) => {
    try {
      const res = await axios.post("/api/auth/verifycode", { email, code });
      return res.data.verified;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const resetPassword = async (email, newPassword) => {
    try {
      await axios.post("/api/auth/resetpassword", { email, newPassword });
      navigate("/login");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const resetEmail = async (email, newEmail) => {
    try {
      await axios.post("/api/auth/changeemail", { email, newEmail });
      const response = await axios.get("/api/auth/profile");
      setUser(response.data);
    } catch (error) {
      console.log(err);
      throw error;
    }
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
        sendVerificationCode,
        verifyEmailCode,
        resetPassword,
        resetEmail,
        regError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
