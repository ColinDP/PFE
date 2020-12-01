import React from "react";
import { Switch, Route } from "react-router-dom";

// import { Route, Switch, Link } from 'react-router-native';

import { Button } from "react-native";

import AjouterTuto from "./PageTest";
import RegisterForm from "./RegisterForm";

import LoginForm from "./LoginForm";


function Main() {
  return (
    <div>
        <Switch>        
          <Route exact path="/add" exact>
            <AjouterTuto />
          </Route>  
          <Route exact path="/" exact>
            <RegisterForm />
          </Route>
          <Route exact path="/login" exact>
            <LoginForm />
          </Route>  
        </Switch>   
    </div>
  );
}

export default Main;
