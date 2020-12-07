import React, { useState } from "react";
import SelectAccountForm from "components/AuthForm/SelectAccountForm";
import { View } from "react-native";
import { Card, Button, IconButton } from "react-native-paper";
import DoctorForm from "components/AuthForm/DoctorForm";
import EstablishmentForm from "components/AuthForm/EstablishmentForm";
import AuthService from "services/authService";
import { Redirect } from "react-router-dom";

const RegisterContainer = () => {
  const userLoggedIn = AuthService.getCurrentUser();
  const [account, setAccount] = useState("");

  if (userLoggedIn) return <Redirect to={{ pathname: "/home" }} />;
  else
    return (
      <View>
        {!account && <SelectAccountForm setAccount={setAccount} />}
        {account === "Médecin" && <DoctorForm setAccount={setAccount} />}
        {account === "Établissement" && (
          <EstablishmentForm setAccount={setAccount} />
        )}
      </View>
    );
};

export default RegisterContainer;
