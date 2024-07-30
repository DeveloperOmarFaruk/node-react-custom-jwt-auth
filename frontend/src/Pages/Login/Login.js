import axios from "axios";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthContext/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const location = useLocation();
  const windowScroll = () => {
    window.scrollTo(0, 0);
    navigate(location?.state ? location.state : "/");
  };

  const handleLoginChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(formData);
    windowScroll();
  };

  return (
    <>
      <div className="text-center" style={{ margin: "4rem auto" }}>
        <h3 className="mb-4">Login Form</h3>

        <div className="row" style={{ width: "100%", margin: "4rem auto" }}>
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"></div>

          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <form onSubmit={handleLogin}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  required
                  name="email"
                  placeholder="Email Address"
                  onChange={handleLoginChange}
                  style={{ border: "1px solid #86b7fe" }}
                />
                <label for="floatingInput">Email Address</label>
              </div>
              <div className="form-floating mb-4">
                <input
                  type="password"
                  className="form-control"
                  required
                  name="password"
                  placeholder="Password"
                  onChange={handleLoginChange}
                  style={{ border: "1px solid #86b7fe" }}
                />
                <label for="floatingPassword">Password</label>
              </div>

              <div className=" mb-4 text-start">
                <button type="submit" className="btn btn-info">
                  Login
                </button>
              </div>

              <div className=" mb-4 text-start">
                <p>
                  Don't have an account?{" "}
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/register`)}
                  >
                    Register
                  </span>
                </p>
              </div>
            </form>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"></div>
        </div>
      </div>
    </>
  );
};

export default Login;
