import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import Loading from "../Components/Loading/Loading";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const URL = `http://localhost:5000`;
  //   const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${URL}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data.userInfo);
        })
        .catch(() => {
          localStorage.removeItem("token");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [URL]);

  const login = async (formData) => {
    try {
      const res = await axios.post(`${URL}/login`, formData);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.userInfo);
      setToken(res.data.token);

      if (res.data) {
        // navigate(`/`);
        toast.success("Your Login Successful");
      }
    } catch (err) {
      if (err) {
        toast.error("Invalid email or password");
      }
    }
  };

  const register = async (formData) => {
    const res = await axios.post(`${URL}/register`, formData);
    if (res.data) {
      //   navigate(`/login`);
      toast.success("Registration Successful");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    if (user === null) {
    } else {
      toast.success("Logout Successful");
    }
  };

  if (loading) {
    return (
      <div style={{ marginTop: "20rem" }}>
        <Loading />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, token, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
