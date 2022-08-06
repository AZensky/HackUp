import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../store/events";
import NavChoice from "../EventGroupSharedComponents/NavChoice";
import EventDetails from "./EventDetails";
import "./EventsPage.css";
import { useLocation } from "react-router-dom";

function EventsPage() {
  const dispatch = useDispatch();

  const useQuery = () => new URLSearchParams(useLocation().search);

  let query = useQuery();

  const events = Object.values(useSelector((state) => state.events));
  let searchWord = query.get("name") ? query.get("name") : undefined;

  useEffect(() => {
    dispatch(getAllEvents(searchWord));
  }, [dispatch, searchWord]);

  return (
    <>
      <div className="events-page-container">
        <NavChoice displaySort={false} isEvent={true} />
        {events.length > 0 &&
          events.map((event) => (
            <EventDetails
              key={event.id}
              name={event.name}
              group={event.Group.name}
              city={event.Venue.city}
              state={event.Venue.state}
              attendees={event.numAttending}
              preview={event.previewImage}
              id={event.id}
              startDate={event.startDate}
            />
          ))}
        {events.length === 0 && <h2>No Events Found</h2>}
      </div>
    </>
  );
}

export default EventsPage;
