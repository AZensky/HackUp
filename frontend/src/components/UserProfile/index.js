import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Footer from "../Footer";
import ProfileButton from "../HomePageNavigation/ProfileButton";
import "./UserProfile.css";

function UserProfile() {
  const sessionUser = useSelector((state) => state.session.user);

  const [groupsJoined, setGroupsJoined] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/users/current-user/groups");
      const data = await response.json();
      setGroupsJoined(data.Groups);
      return data;
    };

    fetchData().catch(console.error);
  }, []);

  // if user is not logged in, redirect
  if (!sessionUser) return <Redirect to="/" />;

  return (
    <>
      <div className="profile-main-content">
        <div className="users-info-container">
          <div className="user-image">
            <ProfileButton classStyle="profile-page-img" user={sessionUser} />
          </div>
          <h1>
            {sessionUser.firstName} {sessionUser.lastName}
          </h1>
        </div>

        <div className="group-count-container">
          <div className="group-count">
            <span>{groupsJoined.length}</span> Groups
          </div>
        </div>

        <div className="joined-groups-container">
          <div className="joined-groups">
            <h2>Groups</h2>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserProfile;