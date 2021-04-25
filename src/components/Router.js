import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "components/Navigation";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profie from "routes/Profie";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/profile">
              <Profie />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
