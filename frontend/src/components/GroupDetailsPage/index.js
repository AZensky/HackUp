import React from "react";
import "./GroupDetailsPage.css";
import GroupDetailsHeader from "./GroupDetailsHeader";
import GroupUpcomingEvents from "./GroupUpcomingEvents";

function GroupDetailsPage() {
  return (
    <>
      <GroupDetailsHeader />
      <div className="group-details-page__main-content-container">
        <div className="group-details-page__main-content">
          <div className="about-and-upcoming-container">
            <div className="group-details__about-section">
              <h4>What we're about</h4>
              <p>
                The Monthly dev is a series of online events brought to you with
                love by daily.dev. It's a place for softwar engineers to gath
                and hear world-class The Monthly dev is a series of online
                events brought to you with love by daily.dev. It's a place for
                softwar engineers to gath and hear world-class The Monthly dev
                is a series of online events brought to you with love by
                daily.dev. It's a place for softwar engineers to gath and hear
                world-class The Monthly dev is a series of online events brought
                to you with love by daily.dev. It's a place for softwar
                engineers to gath and hear world-class The Monthly dev is a
                series of online events brought to you with love by daily.dev.
                It's a place for softwar engineers to gath and hear world-class
              </p>
            </div>
            <h4>Upcoming Events</h4>
            <GroupUpcomingEvents />
          </div>

          <div className="organizer-and-members-container"></div>
        </div>
      </div>
    </>
  );
}

export default GroupDetailsPage;
