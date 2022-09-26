import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent } from "../../store/events";
import { csrfFetch } from "../../store/csrf";
import "./EventDetailsHeader.css";

function EventDetailsHeader({ event }) {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const [eventDetails, setEventDetails] = useState();
  const [eventAttendees, setEventAttendees] = useState([]);
  const [groupDetails, setGroupDetails] = useState();
  const [groupMembers, setGroupMembers] = useState([]);

  useEffect(() => {
    const getEventDetails = async () => {
      let response = await fetch(`/api/events/${eventId}`);
      let data = await response.json();
      setEventDetails(data);
    };

    const getEventAttendees = async () => {
      let response = await fetch(`/api/events/${eventId}/attendees`);
      let data = await response.json();
      setEventAttendees(data.Attendees);
    };

    getEventDetails().catch(console.error);
    getEventAttendees().catch(console.error);
  }, [eventId]);

  useEffect(() => {
    const getGroupDetails = async () => {
      let response = await fetch(`/api/groups/${eventDetails?.Group.id}`);
      let data = await response.json();
      setGroupDetails(data);
    };

    const getGroupMembers = async () => {
      let response = await fetch(
        `/api/groups/${eventDetails?.Group.id}/members`
      );
      let data = await response.json();
      setGroupMembers(data.Members);
    };

    if (eventDetails) {
      getGroupDetails().catch(console.error);
    }

    if (eventDetails) {
      getGroupMembers().catch(console.error);
    }
  }, [eventDetails]);

  async function handleDelete() {
    await dispatch(deleteEvent(eventId));

    history.push("/events");
  }

  // function to handle request to attend event
  async function handleAttend() {
    async function attendRequest() {
      await csrfFetch(`/api/events/${eventId}/attendees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const getEventAttendees = async () => {
      let response = await fetch(`/api/events/${eventId}/attendees`);
      let data = await response.json();
      setEventAttendees(data.Attendees);
    };

    await attendRequest();
    await getEventAttendees().catch(console.error);
  }

  // function to handle request to unattend event
  async function handleUnattend() {
    const attendeeId = sessionUser.id;
    async function unattendRequest() {
      await csrfFetch(`/api/events/${eventId}/attendees/${attendeeId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const getEventAttendees = async () => {
      let response = await fetch(`/api/events/${eventId}/attendees`);
      let data = await response.json();
      setEventAttendees(data.Attendees);
    };

    await unattendRequest();
    await getEventAttendees().catch(console.error);
  }

  let days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let timeStr;
  if (event) {
    const newDate = new Date(event.startDate);
    const date = newDate.getUTCDate();
    let day = days[newDate.getDay()];
    let hours = newDate.getHours();
    let month = monthNames[newDate.getMonth()];
    const minutes = newDate.getMinutes();
    const year = newDate.getFullYear();

    timeStr = `${day}, ${month} ${date}, ${year}`;
  }

  return (
    <div className="event-details-header-container">
      <div className="event-details-header-content">
        <time>{timeStr}</time>
        <h1>{event && event.name} </h1>
        <div className="event-organizer-info">
          <i className="fa-solid fa-user"></i>
          <div className="hosted-label">
            <p>Hosted By</p>
            <span>{event && event.Group.name}</span>
          </div>
        </div>
      </div>
      {/* Conditionally render these options if the current user is the organizer of the group that created the event */}
      {sessionUser &&
        eventDetails &&
        groupDetails &&
        sessionUser?.id === groupDetails?.organizerId && (
          <div className="event-edit-delete-menu-container">
            <i
              className="fa-solid fa-ellipsis"
              onClick={() => setShowMenu(!showMenu)}
            ></i>
            {showMenu && (
              <div className="event-edit-delete-menu">
                <Link
                  to={`/events/edit/${eventId}`}
                  className="edit-event-link"
                >
                  Edit event
                </Link>
                <button onClick={handleDelete}>Delete event</button>
                <Link
                  to={`/events/${eventId}/approve/attendees`}
                  className="edit-event-link"
                >
                  Edit attendees
                </Link>
              </div>
            )}
          </div>
        )}
      {/* If they are logged in, and they are a member of the group that made the event, and their event status is not pending, render a request to attend event button */}

      {sessionUser && eventDetails && groupDetails && groupMembers && (
        <div className="event-attend-button-container">
          {groupMembers.map((member) => {
            if (
              member.id === sessionUser.id &&
              member.Membership.status === "member" &&
              eventAttendees.find(
                (attendee) =>
                  attendee.id === sessionUser.id &&
                  attendee.Attendance.status === "pending"
              )
            ) {
              return (
                <div className="event-attend-container" key={member.id}>
                  <button className="event-attend-button-request" disabled>
                    Request Pending
                  </button>
                </div>
              );
            } else if (
              member.id === sessionUser.id &&
              member.Membership.status === "member" &&
              eventAttendees.find(
                (attendee) =>
                  attendee.id === sessionUser.id &&
                  (attendee.Attendance.status === "member" ||
                    attendee.Attendance.status === "co-host")
              )
            ) {
              return (
                <div className="event-attend-container" key={member.id}>
                  <button
                    className="event-attend-button"
                    onClick={handleUnattend}
                  >
                    Unattend Event
                  </button>
                </div>
              );
            }
          })}

          {groupMembers.map((member) => {
            if (
              member.id === sessionUser.id &&
              member.Membership.status === "member" &&
              !eventAttendees.find((attendee) => attendee.id === sessionUser.id)
            ) {
              return (
                <div className="event-attend-container" key={member.id}>
                  <button
                    className="event-attend-button"
                    onClick={handleAttend}
                  >
                    Request to Attend
                  </button>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}

export default EventDetailsHeader;
