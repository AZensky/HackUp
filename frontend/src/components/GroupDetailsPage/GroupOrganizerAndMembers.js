import React from "react";
import "./GroupOrganizerAndMembers.css";

function GroupOrganizerAndMembers({
  organizerFirstName,
  organizerLastName,
  numMembers,
}) {
  return (
    <>
      <div className="organizer-group-details">
        <h4>Organizers</h4>
        <i className="fa-solid fa-user"></i>
        <span>
          {organizerFirstName}, {organizerLastName}
        </span>
      </div>

      <div className="members-group-details">
        <h4>Members: {numMembers}</h4>
      </div>
    </>
  );
}

export default GroupOrganizerAndMembers;
