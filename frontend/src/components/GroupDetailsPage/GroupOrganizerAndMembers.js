import React from "react";
import "./GroupOrganizerAndMembers.css";

function GroupOrganizerAndMembers({
  organizerFirstName,
  organizerLastName,
  numMembers,
}) {
  return (
    <div className="organizer-group-details">
      <h4>Organizers</h4>
      <i class="fa-solid fa-user"></i>
      <span>
        {organizerFirstName}, {organizerLastName}
      </span>
    </div>
  );
}

export default GroupOrganizerAndMembers;
