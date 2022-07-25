import React, { useEffect, useState } from "react";
import "./EventDetailsPage.css";
import { useParams } from "react-router-dom";
import EventDetailsHeader from "./EventDetailsHeader";

function EventDetailsPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState();
  useEffect(() => {
    const setEventDetails = async () => {
      const response = await fetch(`/api/groups/${eventId}`);
      const data = await response.json();
      setEvent(data);
      return data;
    };

    setEventDetails().catch(console.error);
  }, [eventId]);

  return <EventDetailsHeader event={event} />;
}

export default EventDetailsPage;
