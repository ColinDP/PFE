import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import AuthService from "services/authService";
import { useHistory } from "react-router-dom";

const LogoutButton = ({ style }) => {
  const history = useHistory();

  const handlePress = () => {
    const token = localStorage.getItem("token");
    const data = { token };
    AuthService.logout(data).then((resp) => {
      localStorage.removeItem("user");
      history.push("/");
    });
  };

  return (
    <Button style={styles.logout} mode="contained" onPress={handlePress}>
      Déconnexion
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
    width: "200px",
  },
});
export default LogoutButton;
