import React, { useState } from "react";
import DataService from "../services/Service";
import { StyleSheet, View, Text, Button } from "react-native";

const PageTest = () => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false,
  };
  const [data, setData] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  const saveData = () => {
    var data = {
      // title: "coucou",
      // description: "help"
      email: "demo@hotmail.com",
      password: "1234",
    };

    DataService.create(data)
      .then((response) => {
        setData({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      flexDirection: "column",
      justifyContent: "center",
    },
    button: {
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        onPress={saveData}
        title="envoi"
        color="#841584"
      />
    </View>
  );
};

export default PageTest;
