import React from "react";
import { Link } from "react-router-dom";
import "./NavChoice.css";
import NavSort from "./NavSort";

function NavChoice({ displaySort, isEvent }) {
  return (
    <div className="nav-choice-container">
      <div className="nav-choice">
        <Link to="/events" className="nav-choice-link">
          Events
        </Link>
        <Link to="/groups" className="nav-choice-link">
          Groups
        </Link>
      </div>
      <h1 className="nav-choice-main-title">
        Suggested {isEvent ? "events" : "groups"}{" "}
      </h1>
      {displaySort && <NavSort />}
    </div>
  );
}

export default NavChoice;
