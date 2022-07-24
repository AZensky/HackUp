import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../store/events";
import { Link } from "react-router-dom";
import NavChoice from "../EventGroupSharedComponents/NavChoice";
import "./EventsPage.css";

function EventsPage() {
  const dispatch = useDispatch();
  const events = Object.values(useSelector((state) => state.events));
  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  return (
    <div className="events-page-container">
      <NavChoice />
    </div>
  );
}

export default EventsPage;
