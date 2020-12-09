import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  RadioButton,
  Card,
  Title,
  Text,
  Button,
  IconButton,
} from "react-native-paper";
import backIcon from "assets/svg/arrow-left.svg";
import { useHistory } from "react-router-dom";

const SelectAccountForm = ({ setAccount }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleSubmit = () => {
    if (value === "") {
      setError("Veuillez sélectionner une option");
    }
    setAccount(value);
  };

  const handleRadioBtnChange = (newValue) => {
    setValue(newValue);
    setError("");
  };

  const handleRedirectToLogin = () => {
    history.push("/login");
  };
  return (
    <Card style={styles.cardContainer}>
      <Card.Content>
        <Title style={styles.title}>Selectionner votre type de compte</Title>
        <View style={styles.radioButtons}>
          <RadioButton.Group
            onValueChange={(newValue) => handleRadioBtnChange(newValue)}
            value={value}
          >
            <RadioButton.Item color="#03dac6" label="Médecin" value="Médecin" />
            <RadioButton.Item
              color="#03dac6"
              label="Établissement"
              value="Établissement"
            />
          </RadioButton.Group>
          <Text style={styles.textError}>{error}</Text>
        </View>
        <Card.Actions style={styles.buttons}>
          <IconButton
            color="#808080"
            icon={backIcon}
            onPress={handleRedirectToLogin}
          />
          <Button mode="contained" onPress={handleSubmit}>
            Suivant
          </Button>
        </Card.Actions>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "400px",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: "40px",
    paddingBottom: "40px",
    borderColor: "#D3D3D3",
    borderWidth: "1px",
    borderRadius: "10px",
    boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.1)",
    transition: "0.1s ease",
  },
  radioButtons: {
    marginBottom: "15px",
    marginTop: "40px",
    height: "100px",
  },
  title: {
    textAlign: "center",
  },
  textError: {
    color: "red",
    textAlign: "center",
  },
  buttons: {
    justifyContent: "space-between",
  },
});

export default SelectAccountForm;
