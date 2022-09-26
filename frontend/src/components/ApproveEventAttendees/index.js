import React, { useState, useEffect } from "react";
import { csrfFetch } from "../../store/csrf";
import { useParams } from "react-router-dom";
import "./ApproveEventAttendees.css";

function ApproveEventAttendees() {
  const { eventId } = useParams();
  const [eventAttendees, setEventAttendees] = useState([]);

  useEffect(() => {
    const getEventAttendees = async () => {
      let response = await fetch(`/api/events/${eventId}/attendees`);
      let data = await response.json();
      let pendingAttendees = data.Attendees.filter(
        (attendee) => attendee.Attendance.status === "pending"
      );
      setEventAttendees(pendingAttendees);
    };

    getEventAttendees().catch(console.error);
  }, [eventId]);

  const handleApprove = async (attendeeId) => {
    async function approveRequest() {
      await csrfFetch(`/api/events/${eventId}/attendees`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: attendeeId,
          status: "member",
        }),
      });
    }

    const getEventAttendees = async () => {
      let response = await fetch(`/api/events/${eventId}/attendees`);
      let data = await response.json();
      let pendingAttendees = data.Attendees.filter(
        (attendee) => attendee.Attendance.status === "pending"
      );
      setEventAttendees(pendingAttendees);
    };

    await approveRequest();
    await getEventAttendees().catch(console.error);
  };

  const handleDeny = async (attendeeId) => {
    async function denyRequest() {
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
      let pendingAttendees = data.Attendees.filter(
        (attendee) => attendee.Attendance.status === "pending"
      );
      setEventAttendees(pendingAttendees);
    };

    await denyRequest();
    await getEventAttendees().catch(console.error);
  };

  return (
    <div className="create-group-form-page-container">
      <div className="create-group-form-container">
        <div className="create-group-form">
          <div className="member-approval-header">
            <h1>Approve Attendees</h1>
          </div>
          <div className="member-approval-list">
            {eventAttendees.map((member) => (
              <div className="member-approval-item" key={member.id}>
                <div className="member-approval-item-name">
                  {member.firstName} {member.lastName}
                </div>
                <div className="member-approval-item-right">
                  <button
                    className="member-approval-item-approve"
                    onClick={() => handleApprove(member.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="member-approval-item-deny"
                    onClick={() => handleDeny(member.id)}
                  >
                    Deny
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApproveEventAttendees;
