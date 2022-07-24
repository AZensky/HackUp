import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Footer from "../Footer";
import ProfileButton from "../HomePageNavigation/ProfileButton";

function UserProfile() {
  const sessionUser = useSelector((state) => state.session.user);

  // if user is not logged in, redirect
  if (!sessionUser) return <Redirect to="/" />;

  return (
    <div className="profile-main-content">
      <div className="users-info-container">
        <div className="user-image">
          <ProfileButton classStyle="profile-page" user={sessionUser} />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
