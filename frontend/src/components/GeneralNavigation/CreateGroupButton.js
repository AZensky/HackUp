import React from "react";
import "./CreateGroupButton.css";
import { Link } from "react-router-dom";

function CreateGroupButton() {
  return (
    <Link to="/create-group">
      <button className="create-group-button">Create a Group</button>
    </Link>
  );
}

export default CreateGroupButton;
