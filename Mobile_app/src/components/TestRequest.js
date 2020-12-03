import React, { useState } from "react";
import DataService from "../services/Service";
import { StyleSheet, View, Text, Button } from "react-native";

const TestRequest = () => {

    const titleText = "Hello";

    DataService.getDeviceId()
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });

      const styles = StyleSheet.create({
        titleText: {
          fontSize: 20,
          margin: 2,
          fontWeight: "bold"
        }
      });


      return (
        <View style={styles.container}>
            <Text style={styles.titleText}>
                {titleText}
                {"\n"}
                {"\n"}
            </Text>
        </View>
    );

};

export default TestRequest;