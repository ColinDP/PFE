import React from "react";
import { StyleSheet } from "react-native";
import { Formik, Field } from "formik";
import * as yup from "yup";
import AuthService from "services/authService";
import CustomInput from "components/AuthForm/CustomInput";
import { Button, Card, Title } from "react-native-paper";
import mailIcon from "assets/svg/mail.svg";
import passwordIcon from "assets/svg/lock.svg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useHistory,
} from "react-router-dom"
const loginSchema = yup.object({
  email: yup.string(),
  password: yup.string(),
});

const LoginForm = ({ setShowRegisterForm }) => {
  const history = useHistory()
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(data, actions) => {
        console.log(data);
        AuthService.authenticateUser(data).then((resp) => {
          console.log(resp)
          localStorage.setItem('token', resp.token)
          history.push('/')
          console.log(localStorage.getItem('token'))
        });
      }}
      validationSchema={loginSchema}
      validateOnChange={true}
    >
      {({ handleSubmit, isValid }) => (
        <Card style={styles.loginContainer}>
          <Card.Content>
            {/*          <TextInput
            mode="outlined"
            style={styles.textInput}
            theme={{
              colors: { primary: "green", underlineColor: "transparent" },
            }}
          /> */}
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
              type="password"
              name="password"
              label="Password"
              secureTextEntry
            />
            <Card.Actions style={styles.buttons}>
              <Button mode="flat" onPress={() => setShowRegisterForm(true)}>
                Créer un compte
              </Button>
              <Button mode="contained" onPress={handleSubmit}>
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
    width: "500px",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: "80px",
    paddingBottom: "80px",
    borderColor: "#D3D3D3",
    borderWidth: "1px",
    borderRadius: "10px",
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
});

export default LoginForm;
