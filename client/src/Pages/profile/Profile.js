import React from "react";
import UserStacks from "../../Components/profile/UserStacks";

const Profile = () => {
  return (
    <div className="row">
      <div className="col-lg-10 offset-lg-1">
        <h3 className="mb-3">Account Details</h3>
        <div className="bg-white shadow rounded">
          <UserStacks />
        </div>
      </div>
    </div>
  );
};

export default Profile;
