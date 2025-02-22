import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import Register from "./Pages/Register/Register";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./AuthContext/AuthContext";
import PrivateRoute from "./ProtectedRoute/PrivateRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
        <ToastContainer position="top-right" />
      </AuthProvider>
    </>
  );
}
export default App;
