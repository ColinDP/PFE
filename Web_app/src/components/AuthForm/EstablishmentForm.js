import React, { useState } from "react";
import { StyleSheet, View, Text} from "react-native";
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
  const [error, setError] = useState("");
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
        setError("");
        console.log(data);
        AuthService.createEstablishment(data)
          .then((resp) => {
            history.push("/login");
          })
          .catch((error) => {
            setError(error.response.data.response);
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
              name="password"
              label="Password"
              secureTextEntry={true}
            />
            <Text style={styles.error}>{error}</Text>
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
    width: "550px",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: "20px",
    paddingBottom: "20px",
    borderColor: "#D3D3D3",
    borderWidth: "1px",
    borderRadius: "10px",
    boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.1)",
    transition: "0.1s ease",
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
  error: {
    textAlign: "center",
    color: "red",
  },
});

export default EstablishmentForm;
