import React, { useEffect, useState } from "react";
import { StyleSheet, Image, Text } from "react-native";
import { Formik, Field } from "formik";
import * as yup from "yup";
import AuthService from "services/authService";
import CustomInput from "components/utils/CustomInput";
import { Button, Card, Title } from "react-native-paper";
import mailIcon from "assets/svg/mail.svg";
import passwordIcon from "assets/svg/lock.svg";
import { useHistory, Redirect } from "react-router-dom";

const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must contain at least 8 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const userLoggedIn = AuthService.getCurrentUser();
  const history = useHistory();
  const [error, setError] = useState("");

  const handleRedirectToRegister = () => {
    history.push("/register");
  };

  if (userLoggedIn) return <Redirect to={{ pathname: "/home" }} />;
  else
    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(data, actions) => {

          setError("");
          // CALL API TO LOGIN USER
          AuthService.authenticateUser(data)
            .then((resp) => {
              if (resp.token) {
                const user = {
                  token: resp.token,
                  role: resp.role,
                };
                localStorage.setItem("user", JSON.stringify(user));
              }
              history.push("/home");
            })
            .catch((error) => {
              setError(error.response.data.response);
            });
        }}
        validationSchema={loginSchema}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ handleSubmit, isValid }) => (
          <Card style={styles.loginContainer}>
            <Card.Content>
              <Title style={styles.title}>Connectez vous</Title>
              <Field
                icon={mailIcon}
                component={CustomInput}
                name="email"
                label="Email"
              />
              <Field
                icon={passwordIcon}
                component={CustomInput}
                name="password"
                label="Password"
                secureTextEntry={true}
              />
              <Text style={styles.error}>{error}</Text>
              <Card.Actions style={styles.buttons}>
                <Button mode="flat" onPress={handleRedirectToRegister}>
                  Créer un compte
                </Button>
                <Button mode="flat" onPress={handleSubmit}>
                  Se connecter
                </Button>
              </Card.Actions>
            </Card.Content>
          </Card>
        )}
      </Formik>
    );
};

const styles = StyleSheet.create({
  loginContainer: {
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
  textInput: {
    height: 40,
    margin: 10,
    backgroundColor: "white",
  },
  title: {
    textAlign: "center",
    marginBottom: "25px",
  },
  buttons: {
    justifyContent: "space-between",
  },
  error: {
    textAlign: "center",
    color: "red",
  },
});

export default LoginForm;
