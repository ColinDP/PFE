import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import CustomInput from "components/utils/CustomInput";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { Card, Title, Button } from "react-native-paper";

const QRCodeSchema = yup.object({
  quantity: yup.number().required("quantity is required"),
  quantity: yup.number().typeError("That doesn't look like a number"),
});

const AskQRCodeForm = ({ handleFormSubmit }) => {
  const isEntreprise = JSON.parse(localStorage.getItem("user")).role == "E";

  return (
    <Formik
      initialValues={{ quantity: 1, names: "" }}
      onSubmit={(data) => handleFormSubmit(data)}
      validationSchema={QRCodeSchema}
    >
      {({ handleSubmit, isValid }) => (
        <>
          <Title style={styles.title}>
            Combien de QR Code avez-vous besoin ?
          </Title>
          <Field
            component={CustomInput}
            name="quantity"
            placeholder="1"
            type="number"
            label="Nombre de QR Codes à générer"
            min="1"
            max="30"
          />
          {isEntreprise && (
            <Field
              component={CustomInput}
              label="Ajouter un nom à vos QR Codes"
              name="names"
              placeholder="ex: QRCode1, QRCode2, .."
            />
          )}
          <Card.Actions style={styles.button}>
            <Button mode="contained" onPress={handleSubmit}>
              Générer CODE QR
            </Button>
          </Card.Actions>
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  numberInput: {
    textAlign: "center",
  },
  title: {
    textAlign: "center",
  },
  button: {
    justifyContent: "center",
    textAlign: "center",
  },
});

export default AskQRCodeForm;
