import React, { useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../../store/events";
import "./EventDetailsHeader.css";

function EventDetailsHeader({ event }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { eventId } = useParams();
  const [showMenu, setShowMenu] = useState(false);

  function handleDelete() {
    dispatch(deleteEvent(eventId));

    history.push("/events");
  }

  return (
    <div className="event-details-header-container">
      <div className="event-details-header-content">
        <time>Friday, March 3, 2023</time>
        <h1>{event && event.name} </h1>
        <div className="event-organizer-info">
          <i class="fa-solid fa-user"></i>
          <div className="hosted-label">
            <p>Hosted By</p>
            <span>{event && event.Group.name}</span>
          </div>
        </div>
      </div>

      <div className="event-edit-delete-menu-container">
        <i
          class="fa-solid fa-ellipsis"
          onClick={() => setShowMenu(!showMenu)}
        ></i>
        {showMenu && (
          <div className="event-edit-delete-menu">
            <Link to={`/events/edit/${eventId}`} className="edit-event-link">
              Edit event
            </Link>
            <button onClick={handleDelete}>Delete event</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventDetailsHeader;
