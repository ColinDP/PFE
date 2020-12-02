import React from "react";
import { StyleSheet, Button, View } from "react-native";
import { Formik, Field } from "formik";
import * as yup from "yup";
import AuthService from "../../services/authService";
import CustomInput from "./CustomInput";

const loginSchema = yup.object({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm = () => {
  return (
    <Formik
      style={styles.container}
      initialValues={{ email: "", password: "" }}
      onSubmit={(data, actions) => {
        console.log(data);
        AuthService.authenticate(data);
      }}
      validationSchema={loginSchema}
    >
      {({ handleSubmit, isValid }) => (
        <View style={styles.loginContainer}>
          <Field component={CustomInput} name="email" placeholder="Email" />
          <Field
            component={CustomInput}
            type="password"
            name="password"
            placeholder="Password"
            secureTextEntry
          />
          <Button onPress={handleSubmit} title="Login" disabled={!isValid} />
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
  loginContainer: {
    width: "30%",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    elevation: 10,
    backgroundColor: "#e6e6e6",
  },
});

export default LoginForm;
