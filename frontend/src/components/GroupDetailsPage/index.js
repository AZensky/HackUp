import React, { useEffect, useState } from "react";
import "./GroupDetailsPage.css";
import GroupDetailsHeader from "./GroupDetailsHeader";
import GroupUpcomingEvents from "./GroupUpcomingEvents";
import GroupOrganizerAndMembers from "./GroupOrganizerAndMembers";
import { useParams } from "react-router-dom";

function GroupDetailsPage() {
  const { groupId } = useParams();

  const [groupDetails, setGroupDetails] = useState();

  useEffect(() => {
    const getGroupDetails = async () => {
      let response = await fetch(`/api/groups/${groupId}`);
      let data = await response.json();
      setGroupDetails(data);
    };

    getGroupDetails().catch(console.error);
  }, [groupId]);

  return (
    <>
      <GroupDetailsHeader />
      <div className="group-details-page__main-content-container">
        <div className="group-details-page__main-content">
          <div className="about-and-upcoming-container">
            <div className="group-details__about-section">
              <h4>What we're about</h4>
              <p>{groupDetails && groupDetails.about}</p>
            </div>
            <h4>Upcoming Events</h4>
            <GroupUpcomingEvents />
          </div>

          <div className="organizer-and-members-container">
            <GroupOrganizerAndMembers
              organizerFirstName={
                groupDetails && groupDetails.Organizer.firstName
              }
              organizerLastName={
                groupDetails && groupDetails.Organizer.lastName
              }
              numMembers={groupDetails && groupDetails.numMembers}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default GroupDetailsPage;
