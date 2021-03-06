import React from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import styled from "styled-components";
import Navigation from "components/Navigation";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profie from "routes/Profie";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Switch>
        {isLoggedIn ? (
          <Main>
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profie userObj={userObj} refreshUser={refreshUser} />
            </Route>
          </Main>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
            <Redirect from="*" to="/" />
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;

const Main = styled.div`
  flex: 3;
`;
