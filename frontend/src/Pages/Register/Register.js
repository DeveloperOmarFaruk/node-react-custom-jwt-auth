import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthContext/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const handleRegisterChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    await register(formData);
    navigate(`/login`);
  };

  return (
    <>
      <div className="text-center" style={{ margin: "4rem auto" }}>
        <h3 className="mb-4">Register Form</h3>

        <div className="row" style={{ width: "100%", margin: "4rem auto" }}>
          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12"></div>

          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <form onSubmit={handleRegister}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  required
                  name="name"
                  placeholder="Name"
                  onChange={handleRegisterChange}
                  style={{ border: "1px solid #86b7fe" }}
                />
                <label for="floatingInput">Name</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  required
                  name="email"
                  placeholder="Email Address"
                  onChange={handleRegisterChange}
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
                  onChange={handleRegisterChange}
                  style={{ border: "1px solid #86b7fe" }}
                />
                <label for="floatingPassword">Password</label>
              </div>

              <div className=" mb-4 text-start">
                <button type="submit" className="btn btn-info">
                  Register
                </button>
              </div>

              <div className=" mb-4 text-start">
                <p>
                  Already have an account?{" "}
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/login`)}
                  >
                    Login
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

export default Register;
