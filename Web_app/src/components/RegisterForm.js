import React from "react";
import { StyleSheet, Button, View } from "react-native";
import { Formik, Field } from "formik";
import * as yup from "yup";
import AuthService from "../services/authService";
import CustomInput from "./CustomInput";

const registerSchema = yup.object({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const RegisterForm = () => {
  return (
    <Formik
      style={styles.container}
      initialValues={{ email: "", password: "" }}
      onSubmit={(data, actions) => {
        console.log(data);
        AuthService.createUser(data).then((resp) => console.log(resp));
      }}
      validationSchema={registerSchema}
    >
      {({ handleSubmit, isValid }) => (
        <View style={styles.registerContainer}>
          <Field component={CustomInput} name="email" placeholder="Email" />
          <Field
            component={CustomInput}
            type="password"
            name="password"
            placeholder="Password"
            secureTextEntry
          />
          <Button onPress={handleSubmit} title="Register" disabled={!isValid} />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  registerContainer: {
    width: "30%",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    elevation: 10,
    backgroundColor: "#e6e6e6",
  },
});

export default RegisterForm;
