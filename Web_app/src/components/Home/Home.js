import React from "react";
import { StyleSheet, View } from "react-native";
import LogoutButton from "./LogoutButton";
import CreateQRCodeContainer from "components/CreateQRCodeContainer/CreateQRCodeContainer";

const Home = () => {
  return (
    <>
      <LogoutButton />
      <View style={styles.container}>
        <CreateQRCodeContainer />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  row: {
    display: "flex",
  },
  leftCol: {
    marginTop: "100px",
    width: "50%",
  },
  rightCol: {
    marginTop: "100px",
    width: "50%",
  },
  top: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    zIndex: 2,
  },
  cardContainer: {
    width: "500px",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: "80px",
    paddingBottom: "80px",
    borderColor: "#D3D3D3",
    borderWidth: "1px",
    borderRadius: "10px",
  },
  title: {
    textAlign: "center",
  },
});

export default Home;
