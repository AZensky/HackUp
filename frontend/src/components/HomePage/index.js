import React, { useEffect } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllEvents } from "../../store/events";
import { getAllGroups } from "../../store/groups";
import Footer from "../Footer";

function HomePage() {
  const dispatch = useDispatch();
  const allEvents = Object.values(useSelector((state) => state.events));
  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  const allGroups = Object.values(useSelector((state) => state.groups));
  useEffect(() => {
    dispatch(getAllGroups());
  }, [dispatch]);

  const events = allEvents.slice(0, 4);
  console.log("Events:", events);

  const groups = allGroups.slice(0, 3);
  console.log("Groups:", groups);

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

        {/* Home Search Form and What's Happening Links */}
        <div className="home-page__search-container__features">
          <div className="home-page__search-container">
            <h2>What do you want to do?</h2>
            <form className="home-page__search-container__form">
              <label>
                <input type="text" placeholder='Search for "Tennis"' />
              </label>
              <button>Search</button>
            </form>
          </div>
          <div className="home-page__search-dates">
            <h2>See what's happening</h2>
            <div className="home-page__search-dates__feature__container">
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
            </div>
            <div>
              <Link to="/" className="home-page__search-dates__feature">
                Online
              </Link>
              <Link to="/" className="home-page__search-dates__feature">
                In person
              </Link>
              <Link to="/" className="home-page__search-dates__feature">
                Trending near you
              </Link>
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
            <div className="upcoming-events__event">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                alt="People Talking"
              />
              <div className="upcoming-events__event__details">
                <time>Fri, Mar 3 · 11:00 AM PDT</time>
                <p className="upcoming-events-event-title">
                  The Annual Great Hackathon: Hosted by HackDevs
                </p>
                <p className="upcoming-events__group-name">HackDevs Group</p>
              </div>
            </div>
            <div className="upcoming-events__event">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                alt="People Talking"
              />
              <div className="upcoming-events__event__details">
                <time>Fri, Mar 3 · 11:00 AM PDT</time>
                <p className="upcoming-events-event-title">
                  The Annual Great Hackathon: Hosted by HackDevs
                </p>
                <p className="upcoming-events__group-name">HackDevs Group</p>
              </div>
            </div>
            <div className="upcoming-events__event">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                alt="People Talking"
              />
              <div className="upcoming-events__event__details">
                <time>Fri, Mar 3 · 11:00 AM PDT</time>
                <p className="upcoming-events-event-title">
                  The Annual Great Hackathon: Hosted by HackDevs
                </p>
                <p className="upcoming-events__group-name">HackDevs Group</p>
              </div>
            </div>
            <div className="upcoming-events__event">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                alt="People Talking"
              />
              <div className="upcoming-events__event__details">
                <time>Fri, Mar 3 · 11:00 AM PDT</time>
                <p className="upcoming-events-event-title">
                  The Annual Great Hackathon: Hosted by HackDevs
                </p>
                <p className="upcoming-events__group-name">HackDevs Group</p>
              </div>
            </div>
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
            <div className="popular-groups__group">
              <div className="group__info-container">
                <img
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="Tech Group"
                />
                <h3>College students that love to code</h3>
              </div>
              <div className="popular-groups__group-details">
                <time>Fri, Mar 3 · 11:00 AM PDT</time>
                <p className="popular-group-description">
                  Tech savvy college students developing projects
                </p>
              </div>
            </div>
            <div className="popular-groups__group">
              <div className="group__info-container">
                <img
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="Tech Group"
                />
                <h3>College students that love to code</h3>
              </div>
              <div className="popular-groups__group-details">
                <time>Fri, Mar 3 · 11:00 AM PDT</time>
                <p className="popular-group-description">
                  Tech savvy college students developing projects
                </p>
              </div>
            </div>
            <div className="popular-groups__group">
              <div className="group__info-container">
                <img
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="Tech Group"
                />
                <h3>College students that love to code</h3>
              </div>
              <div className="popular-groups__group-details">
                <time>Fri, Mar 3 · 11:00 AM PDT</time>
                <p className="popular-group-description">
                  Tech savvy college students developing projects
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;
