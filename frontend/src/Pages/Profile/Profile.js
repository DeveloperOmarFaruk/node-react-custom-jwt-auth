import React, { useContext } from "react";
import { AuthContext } from "../../AuthContext/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="text-center" style={{ margin: "4rem auto" }}>
        <div>
          <h4>{user.name}</h4>

          <h6>{user.email}</h6>
        </div>
      </div>
    </>
  );
};

export default Profile;
