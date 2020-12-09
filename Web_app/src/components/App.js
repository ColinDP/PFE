import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { StyleSheet, View, Image, ImageBackground } from "react-native";
// import { Route, Switch, Link } from 'react-router-native';
import LoginForm from "components/AuthForm/LoginForm";
/* import Home from "components/Home";*/
import Home from "components/Home/Home";
import PrivateRoute from "components/utils/PrivateRoute";
import RegisterContainer from "components/AuthForm/RegisterContainer";

const App = () => {
  return (
    <ImageBackground
      source={require("assets/Clouds.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <Image
        source={require("assets/blockcovid-logo.png")}
        style={styles.logo}
      />
      <View style={styles.container}>
        <Switch>
          <Route path={["/", "/login"]} component={LoginForm} exact />
          <Route path="/register" component={RegisterContainer} exact />

          {/*Private Route redirige directement vers la page de login si
          un utilisateur non connecté essaye d'acceder à la ressource "/home" */}
          <PrivateRoute path={"/home"} component={Home} exact />
        </Switch>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  logo: {
    position: "fixed",
    top: "40px",
    left: "50px",
    zIndex: 2,
    padding: "5px",
    width: 250,
    height: 50,
  },
});

export default App;
