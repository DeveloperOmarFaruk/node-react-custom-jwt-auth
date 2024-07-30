import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import Loading from "../Components/Loading/Loading";
import { AuthContext } from "../AuthContext/AuthContext";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div style={{ marginTop: "20rem" }}>
        <Loading />
      </div>
    );
  }

  if (user.email) {
    return children;
  } else {
    return <Navigate state={location.pathname} to="/login" />;
  }
};

export default PrivateRoute;
