import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import DemoLoginButton from "./DemoLogin";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} classStyle="profile-button" />
    );
  } else {
    sessionLinks = (
      <>
        <DemoLoginButton />
        <LoginFormModal styleClass="home-page-navigation__login" />
        <NavLink to="/signup" className="home-page-navigation__sign-up">
          Sign Up
        </NavLink>
      </>
    );
  }

  return (
    <div className="home-page-navigation">
      <NavLink to="/" className="hackup-logo">
        HackUp
      </NavLink>

      <ul>
        <li>{isLoaded && sessionLinks}</li>
      </ul>
    </div>
  );
}

export default Navigation;
