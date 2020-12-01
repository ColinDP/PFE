import React from "react";
import { StyleSheet, Button, TextInput, View, Text } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

const loginSchema = yup.object({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm = () => {
  return (
    <Formik
      style={styles.container}
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, actions) => {
        console.log(values);
      }}
      validationSchema={loginSchema}
    >
      {(props) => (
        <View style={styles.loginContainer}>
          <TextInput
            style={[
              styles.textInput,
              props.errors.email && props.touched.email && styles.errorInput,
            ]}
            value={props.values.email}
            onBlur={props.handleBlur("email")}
            onChangeText={props.handleChange("email")}
            placeholder="Entrer votre email"
          />
          {props.errors.email && props.touched.email && (
            <Text style={styles.errorText}>{props.errors.email}</Text>
          )}
          <TextInput
            style={[
              styles.textInput,
              props.errors.password &&
                props.touched.password &&
                styles.errorInput,
            ]}
            value={props.values.password}
            onBlur={props.handleBlur("password")}
            onChangeText={props.handleChange("password")}
            placeholder="Entrer votre mot de passe"
          />
          {props.errors.password && props.touched.password && (
            <Text style={styles.errorText}>{props.errors.password}</Text>
          )}
          <Button onPress={props.handleSubmit} title="Login" />
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
  textInput: {
    height: 40,
    width: "100%",
    margin: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  errorText: {
    fontSize: 10,
    color: "red",
  },
  errorInput: {
    borderColor: "red",
  },
});

export default LoginForm;
