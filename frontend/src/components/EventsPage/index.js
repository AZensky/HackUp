import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../store/events";

function EventsPage() {
  const dispatch = useDispatch();
  const events = Object.values(useSelector((state) => state.events));
  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  return (
    <div>
      {events.map((event) => (
        <span key={event.id}>{event.name} | </span>
      ))}
    </div>
  );
}

export default EventsPage;
