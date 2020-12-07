import React from "react";
import { StyleSheet, View } from "react-native";
import LogoutButton from "./LogoutButton";
import CreateQRCodeContainer from "components/CreateQRCodeContainer/CreateQRCodeContainer";

const Home = () => {
  return (
    <>
      <LogoutButton />
      <CreateQRCodeContainer />
    </>
  );
};

export default Home;
