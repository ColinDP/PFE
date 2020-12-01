import React from "react";
import { Switch, Route } from "react-router-dom";

// import { Route, Switch, Link } from 'react-router-native';

import { Button } from "react-native";

import AjouterTuto from "./PageTest";
import RegisterForm from "./RegisterForm";

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
        </Switch>   
    </div>
  );
}

export default Main;
