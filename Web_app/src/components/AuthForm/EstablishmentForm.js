import React from "react";
import { StyleSheet, View } from "react-native";
import { Formik, Field } from "formik";
import * as yup from "yup";
import AuthService from "services/authService";
import CustomInput from "components/AuthForm/CustomInput";
import { Button, Card, Title, IconButton } from "react-native-paper";
import backIcon from "assets/svg/arrow-left.svg";
import { useHistory } from "react-router-dom";

const EstablishmentForm = ({ setAccount }) => {
  const history = useHistory();
  return (
    <Formik
      initialValues={{
        last_name: "",
        first_name: "",
        email: "",
        password: "",
        num_tva: "",
        telephone: "",
        address_street: "",
        address_number: "",
        address_postcode: "",
      }}
      onSubmit={(data, actions) => {
        console.log(data);
        AuthService.createEstablishment(data).then((resp) => {
          history.push("/");
        });
      }}
    >
      {({ handleSubmit, isValid }) => (
        <Card style={styles.cardContainer}>
          <Card.Content>
            <Title style={styles.title}>
              Créer un compte pour votre établissement
            </Title>
            <Field component={CustomInput} name="last_name" label="Nom" />
            <Field component={CustomInput} name="first_name" label="Prénom" />
            <Field
              component={CustomInput}
              name="num_tva"
              label="Numéro de TVA"
            />
            <View style={styles.addressContainer}>
              <View style={styles.streetInput}>
                <Field
                  component={CustomInput}
                  name="address_street"
                  label="Rue"
                />
              </View>
              <View style={styles.numberInput}>
                <Field
                  component={CustomInput}
                  name="address_number"
                  label="n°"
                />
              </View>
              <View style={styles.postcodeInput}>
                <Field
                  component={CustomInput}
                  name="address_postcode"
                  label="Code"
                />
              </View>
            </View>
            <Field component={CustomInput} name="telephone" label="Téléphone" />
            <Field component={CustomInput} name="email" label="Email" />
            <Field
              component={CustomInput}
              type="password"
              name="password"
              label="Password"
              secureTextEntry
            />
            <Card.Actions style={styles.buttons}>
              <IconButton
                color="#808080"
                icon={backIcon}
                onPress={() => setAccount("")}
              />
              <Button mode="contained" onPress={handleSubmit}>
                Valider
              </Button>
            </Card.Actions>
          </Card.Content>
        </Card>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: "80px",
    paddingBottom: "80px",
    borderColor: "#D3D3D3",
    borderWidth: "1px",
    borderRadius: "10px",
  },
  addressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  streetInput: {
    width: "65%",
  },
  numberInput: {
    width: "15%",
  },
  postcodeInput: {
    width: "20%",
  },
  title: {
    textAlign: "center",
  },
  buttons: {
    justifyContent: "space-between",
  },
});

export default EstablishmentForm;
