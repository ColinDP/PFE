import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { StyleSheet, View } from "react-native";
// import { Route, Switch, Link } from 'react-router-native';
import RegisterForm from "components/AuthForm/RegisterForm";
import LoginForm from "components/AuthForm/LoginForm";
import Home from "components/Home";
import GeneratePDF from "./GeneratePDF";

const App = () => {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  return (
    <Switch>
      <Route exact path="/" exact>
        <View style={styles.container}>
          {showRegisterForm ? (
            <RegisterForm setShowRegisterForm={setShowRegisterForm} />
          ) : (
            <LoginForm setShowRegisterForm={setShowRegisterForm} />
          )}
        </View>
      </Route>
      <Route exact path="/home" exact>
        <Home />
      </Route>
    </Switch>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default App;
