import React from "react";
import { StyleSheet, View } from "react-native";
import { Formik, Field } from "formik";
import * as yup from "yup";
import AuthService from "services/authService";
import CustomInput from "components/utils/CustomInput";
import { Button, Card, Title, IconButton } from "react-native-paper";
import backIcon from "assets/svg/arrow-left.svg";
import { useHistory } from "react-router-dom";

const EstablishmentSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must contain at least 8 characters")
    .required("Password is required"),
  num_tva: yup
    .string()
    .uppercase()
    .matches(
      "^(BE)[0-9]{9}$",
      'Invalid TVA number (must start with "BE" followed by 10 digits)'
    )
    .required("TVA is required"),
  address_street: yup.string().required("Street name is required"),
  address_number: yup
    .number()
    .typeError("Must be a number")
    .required("N° is required"),
  address_postcode: yup
    .string()
    .matches("^[1-9]{1}[0-9]{3}$", "Invalid postal code")
    .required("Postcode is required"),
  telephone: yup
    .number()
    .typeError("Must be a number")
    .required("Phone number is required"),
});

const EstablishmentForm = ({ setAccount }) => {
  const history = useHistory();
  return (
    <Formik
      initialValues={{
        name: "",
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
          history.push("/login");
        });
      }}
      validationSchema={EstablishmentSchema}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {({ handleSubmit, isValid }) => (
        <Card style={styles.cardContainer}>
          <Card.Content>
            <Title style={styles.title}>
              Créer un compte pour votre établissement
            </Title>
            <Field component={CustomInput} name="name" label="Nom" />
            <Field
              component={CustomInput}
              name="num_tva"
              label="Numéro de TVA (BE)"
              placeholder="BE1234567890"
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
