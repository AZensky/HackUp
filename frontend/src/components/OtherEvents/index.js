import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../store/events";
import "./OtherEvents.css";
import OtherEventCard from "./OtherEventCard";

function OtherEvents() {
  const dispatch = useDispatch();
  const allEvents = Object.values(useSelector((state) => state.events));
  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  const events = allEvents.slice(0, 3);

  return (
    <div className="other-events-container">
      <h2>Other Events</h2>
      <div className="other-events__event-container">
        {events.length > 0 &&
          events.map((event) => <OtherEventCard key={event.id} />)}
      </div>
    </div>
  );
}

export default OtherEvents;
