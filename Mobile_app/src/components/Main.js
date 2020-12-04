import React from "react";
import Scan from "./Scan";
import HomeScreen from "./HomeScreen";
import { Route, Switch } from 'react-router-native';

function Main() {
  return (
    <Switch>
      <Route exact path="/scan" component={Scan}/>
      <Route exact path="/" component={HomeScreen}/>
    </Switch>
  );
}
export default Main;