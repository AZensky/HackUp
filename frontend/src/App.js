import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupPage";
import GroupsPage from "./components/GroupsPage";
import EventsPage from "./components/EventsPage";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/">
            <HomePage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/groups">
            <GroupsPage />
          </Route>
          <Route path="/events">
            <EventsPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
