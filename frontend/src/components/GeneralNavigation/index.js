import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "../HomePageNavigation/ProfileButton";
import LoginFormModal from "../LoginFormModal";
import CreateGroupButton from "./CreateGroupButton";
import DemoLoginButton from "../HomePageNavigation/DemoLogin";
import "./GeneralNavigation.css";

function GeneralNavigation({ isLoaded }) {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const [searchName, setSearchName] = useState();

  async function handleSearch(e) {
    e.preventDefault();
    let searchInput = searchName;
    setSearchName("");
    history.push(`/events?name=${searchInput}`);
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="session-links-logged-in">
        <CreateGroupButton />
        <ProfileButton user={sessionUser} classStyle="profile-button" />
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <DemoLoginButton />
        <LoginFormModal styleClass="home-page-navigation__login " />
        <NavLink to="/signup" className="general-navigation__sign-up">
          Sign Up
        </NavLink>
      </>
    );
  }

  return (
    <div className="general-navigation">
      {/* Left side of nav */}
      <div className="left-nav">
        <NavLink to="/" className="hackup-logo">
          Hackup
        </NavLink>

        <form onSubmit={handleSearch}>
          <label>
            <input
              type="text"
              className="keyword-search"
              placeholder="Search for events"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </label>
          <button>
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>

      {/* Right side of nav */}
      <div className="right-nav">
        <ul>
          <li>{isLoaded && sessionLinks}</li>
        </ul>
      </div>
    </div>
  );
}

export default GeneralNavigation;
