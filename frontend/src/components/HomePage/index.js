import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="home-page">
      <div className="home-page__main-content">
        {/* Header Text and Image */}
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

        {/* Topic Links */}
        <div className="home-page__topic-links">
          <div className="home-page__topic-links__content">
            <img
              src="https://images.unsplash.com/photo-1543269865-0a740d43b90c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="Pair Programming"
              className="home-page__topic-link__image"
            />
            <div className="home-page__topic-link__link-container">
              <Link to="/groups" className="home-page__topic-link__link">
                Make new friends
              </Link>
              <img
                src="https://secure.meetupstatic.com/next/images/shared/right-arrow.svg?w=32"
                alt="Arrow"
              />
            </div>
          </div>
          <div className="home-page__topic-links__content">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"
              alt="People laughing"
              className="home-page__topic-link__image"
            />
            <div className="home-page__topic-link__link-container">
              <Link to="/groups" className="home-page__topic-link__link">
                Attend a hackathon
              </Link>
              <img
                src="https://secure.meetupstatic.com/next/images/shared/right-arrow.svg?w=32"
                alt="Arrow"
              />
            </div>
          </div>
          <div className="home-page__topic-links__content">
            <img
              src="https://secure.meetupstatic.com/next/images/indexPage/category3.webp?w=1920"
              alt="People laughing"
              className="home-page__topic-link__image"
            />
            <div className="home-page__topic-link__link-container">
              <Link to="/groups" className="home-page__topic-link__link">
                Connect over tech
              </Link>
              <img
                src="https://secure.meetupstatic.com/next/images/shared/right-arrow.svg?w=32"
                alt="Arrow"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
