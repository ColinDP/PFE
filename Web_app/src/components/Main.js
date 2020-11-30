import React from "react";
import { Switch, Route } from "react-router-dom";

// import { Route, Switch, Link } from 'react-router-native';

import { Button } from 'react-native';

import PageTest from "./PageTest";

function Main() {
  return (
    <div>
        <Switch>        
          <Route exact path="/add" exact>
            <PageTest />
          </Route>  
        </Switch>   
    </div>
  );
}

export default Main;