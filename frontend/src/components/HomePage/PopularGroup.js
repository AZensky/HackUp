import React from "react";
import "./PopularGroup.css";
import { Link } from "react-router-dom";

function PopularGroup({ name, about, preview, id }) {
  return (
    <Link to={`/groups/${id}`} className="popular-groups__group">
      <div className="group__info-container">
        <img src={preview} alt="Tech Group" />
        <h3>{name}</h3>
      </div>
      <div className="popular-groups__group-details">
        <p className="popular-group-description">{about}</p>
      </div>
    </Link>
  );
}

export default PopularGroup;
