import React from "react";
import { Link } from "react-router-dom";
import "./NavChoice.css";
import NavSort from "./NavSort";

function NavChoice() {
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
      <NavSort />
    </div>
  );
}

export default NavChoice;
