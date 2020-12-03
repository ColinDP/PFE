import React from "react";
import { StyleSheet, View } from "react-native";
import { Formik, Field } from "formik";
import * as yup from "yup";
import AuthService from "services/authService";
import CustomInput from "components/AuthForm/CustomInput";
import { Button, Card, Title, IconButton } from "react-native-paper";
import backIcon from "assets/svg/arrow-left.svg";

const DoctorForm = ({ setAccount }) => {
  return (
    <Formik
      initialValues={{
        last_name: "",
        first_name: "",
        email: "",
        password: "",
        num_inami: "",
        telephone: "",
      }}
      onSubmit={(data, actions) => {
        console.log(data);
        AuthService.createDoctor(data).then((resp) => console.log(resp));
      }}
    >
      {({ handleSubmit, isValid }) => (
        <Card style={styles.cardContainer}>
          <Card.Content>
            <Title style={styles.title}>Créer un compte Médecin</Title>
            <View style={styles.column}>
              <Field component={CustomInput} name="last_name" label="Nom" />
              <Field component={CustomInput} name="first_name" label="Prénom" />
              <Field component={CustomInput} name="email" label="Email" />
            </View>
            <View style={styles.column}>
              <Field
                component={CustomInput}
                type="password"
                name="password"
                label="Password"
                secureTextEntry
              />

              <Field
                component={CustomInput}
                name="num_inami"
                label="Numéro INAMI"
              />
              <Field
                component={CustomInput}
                name="telephone"
                label="Téléphone"
              />
            </View>
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
    width: "500px",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: "80px",
    paddingBottom: "80px",
    borderColor: "#D3D3D3",
    borderWidth: "1px",
    borderRadius: "10px",
  },
  column: {},
  title: {
    textAlign: "center",
  },
  buttons: {
    justifyContent: "space-between",
  },
});

export default DoctorForm;
