import React, { useState } from "react";
import DataService from "../services/Service";
import * as SecureStore from 'expo-secure-store';
import { StyleSheet, View, Text, Button } from "react-native";


const CheckState = () => {



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
          <Text style={styles.text}>Vous êtes safe</Text>
        </View>
      );
    };

export default CheckState;