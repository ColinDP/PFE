import React, { useState } from "react";
import { StyleSheet, View, Text} from "react-native";
import { Formik, Field } from "formik";
import * as yup from "yup";
import AuthService from "services/authService";
import CustomInput from "components/utils/CustomInput";
import { Button, Card, Title, IconButton } from "react-native-paper";
import backIcon from "assets/svg/arrow-left.svg";
import { useHistory } from "react-router";

const DoctorSchema = yup.object({
  last_name: yup.string().required("Last name is required"),
  first_name: yup.string().required("First name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must contain at least 8 characters")
    .required("Password is required"),
  num_inami: yup
    .number()
    .typeError("Must be a number")
    .required("INAMI is required"),
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

const DoctorForm = ({ setAccount }) => {
  const history = useHistory();
  const [error, setError] = useState("");
  return (
    <Formik
      initialValues={{
        last_name: "",
        first_name: "",
        email: "",
        password: "",
        num_inami: "",
        telephone: "",
        address_street: "",
        address_number: "",
        address_postcode: "",
      }}
      onSubmit={(data, actions) => {
        setError("");
        console.log(data);
        AuthService.createDoctor(data)
          .then((resp) => {
            history.push("/login");
          })
          .catch((error) => {
            setError(error.response.data.response);
          });
      }}
      validationSchema={DoctorSchema}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {({ handleSubmit, isValid }) => (
        <Card style={styles.cardContainer}>
          <Title style={styles.title}>Créer un compte Médecin</Title>
          <Card.Content>
            <Field component={CustomInput} name="last_name" label="Nom" />
            <Field component={CustomInput} name="first_name" label="Prénom" />
            <Field
              component={CustomInput}
              name="num_inami"
              label="Numéro INAMI"
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

export default DoctorForm;
