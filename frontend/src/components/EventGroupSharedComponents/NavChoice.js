import React from "react";
import { NavLink } from "react-router-dom";
import "./NavChoice.css";
import NavSort from "./NavSort";

function NavChoice({ displaySort, isEvent }) {
  return (
    <div className="nav-choice-container">
      <div className="nav-choice">
        <NavLink
          to="/events"
          className="nav-choice-link"
          activeClassName="selected"
        >
          Events
        </NavLink>
        <NavLink
          to="/groups"
          className="nav-choice-link"
          activeClassName="selected"
        >
          Groups
        </NavLink>
      </div>
      <h1 className="nav-choice-main-title">
        Suggested {isEvent ? "events" : "groups"}{" "}
      </h1>
      {displaySort && <NavSort />}
    </div>
  );
}

export default NavChoice;
