import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import AuthService from "services/authService";
import { useHistory } from "react-router-dom";

const LogoutButton = ({ style }) => {
  const history = useHistory();

  const handlePress = () => {
    AuthService.logout().then((resp) => {
      localStorage.removeItem("token");
      history.push("/");
    });
  };

  return (
    <Button style={styles.logout} mode="contained" onPress={handlePress}>
      Logout
    </Button>
  );
};

const styles = StyleSheet.create({
  logout: {
    position: "fixed",
    top: "50px",
    right: "60px",
    zIndex: 2,
    borderRadius: "30px",
    padding: "5px",
    width: "120px",
  },
});
export default LogoutButton;
