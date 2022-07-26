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
import EventDetailsPage from "./components/EventDetailsPage";
import CreateGroupForm from "./components/CreateGroupForm";
import GroupDetailsPage from "./components/GroupDetailsPage";
import EditGroupForm from "./components/EditGroupForm";
import EditEventForm from "./components/EditEventForm";
import CreateEventForm from "./components/CreateEventForm";
import Footer from "./components/Footer";

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
            <Navigation isLoaded={isLoaded} />
            <HomePage />
          </Route>

          <Route path="/groups/:groupId/create-event">
            <Navigation />
            <CreateEventForm />
            <Footer />
          </Route>

          <Route path="/groups/edit/:groupId">
            <Navigation />
            <EditGroupForm />
            <Footer />
          </Route>

          <Route path="/events/edit/:eventId">
            <Navigation />
            <EditEventForm />
            <Footer />
          </Route>

          <Route path="/events/:eventId">
            <GeneralNavigation isLoaded={isLoaded} />
            <EventDetailsPage />
          </Route>

          <Route path="/groups/:groupId">
            <GeneralNavigation isLoaded={isLoaded} />
            <GroupDetailsPage />
          </Route>

          <Route path="/create-group">
            <Navigation />
            <CreateGroupForm />
            <Footer />
          </Route>

          <Route path="/signup">
            <Navigation />
            <SignupFormPage />
            <Footer />
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
