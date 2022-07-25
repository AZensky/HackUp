import React from "react";
import "./GroupDetailsPage.css";
import GroupDetailsHeader from "./GroupDetailsHeader";

function GroupDetailsPage() {
  return (
    <>
      <GroupDetailsHeader />
      <div className="group-details-page__main-content-container">
        <div className="group-details-page__main-content"></div>
      </div>
    </>
  );
}

export default GroupDetailsPage;
