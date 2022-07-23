import React from "react";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-page">
      <div className="home-page__header-container">
        <div className="home-page__header-container__header-text">
          <h1>Celebrating 20 years of real connections on Meetup</h1>
          <p>
            Whatever you’re looking to do this year, Meetup can help. For 20
            years, people have turned to Meetup to meet people, make friends,
            find support, grow a business, and explore their interests.
            Thousands of events are happening every day—join the fun.
          </p>
        </div>
        <img
          src="https://secure.meetupstatic.com/next/images/shared/online_events.svg?w=640"
          alt="Meetup Header"
        />
      </div>
    </div>
  );
}

export default HomePage;
