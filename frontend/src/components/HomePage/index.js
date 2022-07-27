import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllEvents } from "../../store/events";
import { getAllGroups } from "../../store/groups";
import Footer from "../Footer";
import UpcomingEvent from "./UpcomingEvent";
import PopularGroup from "./PopularGroup";

function HomePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchName, setSearchName] = useState();
  const allEvents = Object.values(useSelector((state) => state.events));
  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  const allGroups = Object.values(useSelector((state) => state.groups));
  useEffect(() => {
    dispatch(getAllGroups());
  }, [dispatch]);

  async function handleSearch(e) {
    e.preventDefault();

    history.push(`/events?name=${searchName}`);
  }

  const events = allEvents.slice(0, 4);

  const groups = allGroups.slice(0, 3);

  return (
    <div className="home-page">
      <div className="home-page__main-content">
        {/* Header Text and Image */}
        <div className="home-page__header-container">
          <div className="home-page__header-container__header-text">
            <h1>Celebrating 20 years of real connections on Meetup</h1>
            <p>
              Whatever you're looking to do this year, Meetup can help. For 20
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
            <Link to="/groups">
              <img
                src="https://images.unsplash.com/photo-1543269865-0a740d43b90c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="Pair Programming"
                className="home-page__topic-link__image"
              />
            </Link>
            <div className="home-page__topic-link__link-container">
              <Link to="/groups" className="home-page__topic-link__link">
                <span>Make new friends</span>
                <img
                  src="https://secure.meetupstatic.com/next/images/shared/right-arrow.svg?w=32"
                  alt="Arrow"
                />
              </Link>
            </div>
          </div>
          <div className="home-page__topic-links__content">
            <Link to="/events">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"
                alt="People laughing"
                className="home-page__topic-link__image"
              />
            </Link>
            <div className="home-page__topic-link__link-container">
              <Link to="/groups" className="home-page__topic-link__link">
                <span>Attend a hackathon</span>
                <img
                  src="https://secure.meetupstatic.com/next/images/shared/right-arrow.svg?w=32"
                  alt="Arrow"
                />
              </Link>
            </div>
          </div>
          <div className="home-page__topic-links__content">
            <Link to="/groups">
              <img
                src="https://secure.meetupstatic.com/next/images/indexPage/category3.webp?w=1920"
                alt="People laughing"
                className="home-page__topic-link__image"
              />
            </Link>
            <div className="home-page__topic-link__link-container">
              <Link to="/groups" className="home-page__topic-link__link">
                <span>Connect over tech</span>
                <img
                  src="https://secure.meetupstatic.com/next/images/shared/right-arrow.svg?w=32"
                  alt="Arrow"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Home Search Form and What's Happening Links */}
        <div className="home-page__search-container__features">
          <div className="home-page__search-container">
            <h2>What do you want to do?</h2>
            <form
              className="home-page__search-container__form"
              onSubmit={handleSearch}
            >
              <label>
                <input
                  type="text"
                  placeholder='Search for "Tennis"'
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </label>
              <button>Search</button>
            </form>
          </div>
          <div className="home-page__search-dates">
            <h2>See what's happening</h2>
            {/* <div className="home-page__search-dates__feature__container">
              <Link to="/" className="home-page__search-dates__feature">
                Starting soon
              </Link>
              <Link to="/" className="home-page__search-dates__feature">
                Today
              </Link>
              <Link to="/" className="home-page__search-dates__feature">
                Tomorrow
              </Link>
              <Link to="/" className="home-page__search-dates__feature">
                This week
              </Link>
            </div> */}
            <div>
              <Link to="/events" className="home-page__search-dates__feature">
                Events
              </Link>
              <Link to="/groups" className="home-page__search-dates__feature">
                Groups
              </Link>
              {/* <Link to="/" className="home-page__search-dates__feature">
                Online
              </Link>
              <Link to="/" className="home-page__search-dates__feature">
                In person
              </Link> */}
              {/* <Link to="/" className="home-page__search-dates__feature">
                Trending near you
              </Link> */}
            </div>
          </div>
        </div>
      </div>
      <div className="home-page__secondary-content">
        {/* How Meetup Works */}
        <h2>How Meetup Works</h2>
        <p>
          Meet new people who share your interests through online and in-person
          events. It's free to create an account.
        </p>

        {/* Find Groups and Events */}
        <div className="home-page__secondary-content__events-and-groups">
          <div className="home-page__secondary-content__events-and-groups__content-container">
            <img
              src="https://secure.meetupstatic.com/next/images/shared/joinGroup.svg?w=256"
              alt="Group of people"
            />
            <h3>Find a Group</h3>
            <p>
              Do what you love, meet others who love it, find your community.
              The rest is history!
            </p>
          </div>
          <div className="home-page__secondary-content__events-and-groups__content-container">
            <img
              src="https://secure.meetupstatic.com/next/images/shared/ticket.svg?w=256"
              alt="Group of people"
            />
            <h3>Attend a Hackathon</h3>
            <p>
              Hackathons are happening all the time, covering topics such as
              machine learning, web development, data, and FinTech.
            </p>
          </div>
          <div className="home-page__secondary-content__events-and-groups__content-container">
            <img
              src="https://secure.meetupstatic.com/next/images/shared/handsUp.svg?w=256"
              alt="Group of people"
            />
            <h3>Discover Your Passion</h3>
            <p>
              You don't have to be an expert to attend an event and discover
              explore your interests.
            </p>
          </div>
        </div>

        {/* Link to Sign up */}
        <Link to="/signup" className="home-page__secondary-content__signup">
          Join Meetup
        </Link>
      </div>

      <div className="home-page__tertiary-content">
        {/* Upcoming Events */}
        <div className="upcoming-events-header">
          <h2>Upcoming events</h2>
          <Link to="/events" className="upcoming-events-header__explore">
            Explore more events
          </Link>
        </div>
        <div className="upcoming-events__container">
          <div className="upcoming-events">
            {events.map((event) => (
              <UpcomingEvent
                key={event.id}
                preview={event.previewImage}
                name={event.name}
                group={event.Group.name}
                id={event.id}
              />
            ))}
          </div>
        </div>

        {/* Popular Groups */}
        <div className="upcoming-groups-header">
          <h2>Popular groups</h2>
          <Link to="/groups" className="upcoming-groups-header__explore">
            Explore more groups
          </Link>
        </div>
        <div className="popular-groups-container">
          <div className="popular-groups-container__popular-groups">
            {groups.map((group) => (
              <PopularGroup
                key={group.id}
                name={group.name}
                about={group.about}
                preview={group.previewImage}
                id={group.id}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;
