import React, { useEffect, useState } from "react";
import "./GroupDetailsPage.css";
import { useParams } from "react-router-dom";

function GroupDetailsPage() {
  const { groupId } = useParams();
  const [group, setGroup] = useState();
  useEffect(() => {
    const getGroupDetails = async () => {
      const response = await fetch(`/api/groups/${groupId}`);
      const data = await response.json();
      setGroup(data);
      return data;
    };

    getGroupDetails().catch(console.error);
  }, [groupId]);

  return (
    <div className="group-details-header-container">
      <div className="group-details-header-content">
        <time>Friday, March 3, 2023</time>
        <h1>{group && group.name} </h1>
        <div className="group-organizer-info">
          <i class="fa-solid fa-user"></i>
          <div className="hosted-label">
            <p>Hosted By</p>
            <span>
              {group.Organizer.firstName} {group.Organizer.lastName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupDetailsPage;
