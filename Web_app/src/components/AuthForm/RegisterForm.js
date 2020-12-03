import React, { useState } from "react";
import SelectAccountForm from "components/AuthForm/SelectAccountForm";
import { View } from "react-native";
import { Card, Button, IconButton } from "react-native-paper";
import DoctorForm from "./DoctorForm";
import EstablishmentForm from "./EstablishmentForm";

const RegisterForm = ({ setShowRegisterForm }) => {
  const [account, setAccount] = useState("");
  return (
    <View>
      {!account && (
        <SelectAccountForm
          setShowRegisterForm={setShowRegisterForm}
          setAccount={setAccount}
        />
      )}
      {account === "Médecin" && <DoctorForm setAccount={setAccount} />}
      {account === "Établissement" && (
        <EstablishmentForm setAccount={setAccount} />
      )}
    </View>
  );
};

export default RegisterForm;
