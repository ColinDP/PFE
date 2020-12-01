import React from "react";
import { Switch, Route } from "react-router-dom";

// import { Route, Switch, Link } from 'react-router-native';

import { Button } from "react-native";

import PageTest from "./PageTest";
import LoginForm from "./LoginForm";

function Main() {
  return (
    <div>
      <Switch>
        <Route exact path="/add" exact>
          <PageTest />
        </Route>
        <Route exact path="/login" exact>
          <LoginForm />
        </Route>
      </Switch>
    </div>
  );
}

export default Main;
