import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
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
          <div className="profile-page-img">{sessionUser.firstName[0]}</div>
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
            <div className="all-joined-groups">
              {groupsJoined.length > 0 &&
                groupsJoined.map((group) => (
                  <Link
                    to={`/groups/${group.id}`}
                    className="groups-joined-link"
                    key={group.id}
                  >
                    <div className="joined-group-details-container">
                      <img
                        src={group.previewImage}
                        alt=""
                        className="joined-group-details__img"
                      />
                      <div className="joined-group-details__name">
                        {group.name}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
