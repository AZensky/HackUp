import React from "react";
import "./PopularGroup.css";

function PopularGroup({ name, about, preview }) {
  return (
    <div className="popular-groups__group">
      <div className="group__info-container">
        <img src={preview} alt="Tech Group" />
        <h3>{name}</h3>
      </div>
      <div className="popular-groups__group-details">
        <time>Fri, Mar 3 · 11:00 AM PDT</time>
        <p className="popular-group-description">{about}</p>
      </div>
    </div>
  );
}

export default PopularGroup;
