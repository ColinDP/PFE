import React from "react";
import { Button } from "react-native-paper";
import AuthService from "services/authService";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const history = useHistory();
  const handlePress = () => {
    const token = localStorage.getItem("token")
    const data = {token}
    AuthService.logout(data).then((resp) => {
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
