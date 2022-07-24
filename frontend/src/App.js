import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupPage";
import GroupsPage from "./components/GroupsPage";
import EventsPage from "./components/EventsPage";
import Navigation from "./components/HomePageNavigation";
import GeneralNavigation from "./components/GeneralNavigation";
import HomePage from "./components/HomePage";
import * as sessionActions from "./store/session";
import UserProfile from "./components/UserProfile";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Navigation isLoaded={isLoaded} classStyle="profile-button" />
            <HomePage />
          </Route>
          <Route path="/signup">
            <Navigation />
            <SignupFormPage />
          </Route>
          <Route path="/groups">
            <GeneralNavigation isLoaded={isLoaded} />
            <GroupsPage />
          </Route>
          <Route path="/events">
            <GeneralNavigation isLoaded={isLoaded} />
            <EventsPage />
          </Route>
          <Route path="/profile">
            <GeneralNavigation isLoaded={isLoaded} />
            <UserProfile />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
