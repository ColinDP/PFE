import React, { useState } from "react";
import DataService from "../services/Service";
import * as SecureStore from 'expo-secure-store';
import { StyleSheet, View, Text, Button } from "react-native";


const Expositions = ({infections}) => {
    console.log(infections);

    function renderSwitch(code){
      switch(code){
        case 0:
          return <Text style={styles.text}>Vous êtes safe</Text>
        case 3:
          console.log("code est 3");
          return <View>
            <Text style={styles.text}>Attention ! Vous avez été en contact avec une ou plusieurs personnes positives ces 10 derniers jours.</Text>
            <Text/>
            <Text style={styles.text}>Il ya eu exposition dans {infections.expositions} endroits différents</Text>
          </View>
      }
    }
    const styles = StyleSheet.create({
        pageTestContainer: {
          flex: 1,
          backgroundColor: "#fff",
          flexDirection: "column",
          justifyContent: "center",
        },
        text: {
          textAlign: "center",
          fontSize: 20,
          fontWeight: "bold"
        },
      });


      return (
        <View style={styles.pageTestContainer}>
          {renderSwitch(infections.code)}
        </View>
      );
};
export default Expositions;