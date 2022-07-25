import React from "react";
import "./GroupDetailsHeader.css";

function GroupDetailsHeader() {
  return (
    <div className="group-details-header-container">
      <div className="group-details-header-content">
        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
          alt="Group Pic"
        />
        <div className="group-header-info">
          <h1>The Monthly Dev: World-Class Talks by Expert Developers</h1>
          <div className="group-details-header-location-container">
            <i class="fa-solid fa-lg fa-location-pin"></i>
            <span className="group-details-location-span">
              San Francisco CA
            </span>
          </div>
          <div className="group-details-headers-members-container">
            <i class="fa-solid fa-sm fa-people-group"></i>
            <span className="group-details-members-span">74 members</span>
          </div>
          <div className="group-details-headers-organizer-container">
            <i class="fa-solid fa-xl fa-user"></i>
            <span className="group-details-organizer-span">Organized By</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupDetailsHeader;
