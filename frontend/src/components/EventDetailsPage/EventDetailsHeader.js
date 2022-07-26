import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent } from "../../store/events";
import "./EventDetailsHeader.css";

function EventDetailsHeader({ event }) {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const [eventDetails, setEventDetails] = useState();
  const [groupDetails, setGroupDetails] = useState();

  useEffect(() => {
    const getEventDetails = async () => {
      let response = await fetch(`/api/events/${eventId}`);
      let data = await response.json();
      setEventDetails(data);
    };

    getEventDetails().catch(console.error);
  }, [eventId]);

  useEffect(() => {
    const getGroupDetails = async () => {
      let response = await fetch(`/api/groups/${eventDetails?.Group.id}`);
      let data = await response.json();
      setGroupDetails(data);
    };

    if (eventDetails) {
      getGroupDetails().catch(console.error);
    }
  }, [eventDetails]);

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

      {/* Conditionally render these options if the current user is the organizer of the group that created the event */}
      {sessionUser && eventDetails && groupDetails && (
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
      )}
    </div>
  );
}

export default EventDetailsHeader;
