import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./GroupUpcomingEvents.css";

function GroupUpcomingEvents() {
  const { groupId } = useParams();
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const getGroupEvents = async () => {
      const response = await fetch(`/api/groups/${groupId}/events`);
      const data = await response.json();
      setUpcomingEvents(data.Events);
    };

    getGroupEvents().catch(console.error);
  }, []);

  return (
    <div className="group-upcoming-event-container">
      {upcomingEvents.length > 0 &&
        upcomingEvents.map((event) => (
          <Link
            key={event.id}
            to={`/events/${event.id}`}
            className="group-upcoming-event-info-container"
          >
            <time>Fri, Mar 3, 2023, 8:00 AM PST</time>
            <span>{event.name}</span>
            <div className="group-upcoming-event-attendees-container">
              <i class="fa-solid fa-user-large"></i>
              <p className="group-upcoming-event-num-attendees">
                {event.numAttending}{" "}
                {event.numAttending === 1 ? "attendee" : "attendees"}{" "}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default GroupUpcomingEvents;
