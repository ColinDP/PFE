import React from "react";
import { Button } from "react-native-paper";
import AuthService from "services/authService";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const history = useHistory();
  const handlePress = () => {
    AuthService.logout().then((resp) => {
      localStorage.removeItem("token");
      history.push("/");
    });
  };
  return (
    <Button mode="contained" onPress={handlePress}>
      Logout
    </Button>
  );
};

export default Logout;
