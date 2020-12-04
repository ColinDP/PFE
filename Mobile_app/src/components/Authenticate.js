import React, { useState } from "react";
import DataService from "../services/Service";
import * as SecureStore from 'expo-secure-store';
import { StyleSheet, View, Text, Button } from "react-native";

const Authenticate = () => {

    const [id, setId] = useState("");

    DataService.getDeviceId()
      .then((response) => {

        //store id
        SecureStore.setItemAsync("device_id", response.data.device_id);

        console.log(response.data.device_id);
      })
      .catch((e) => {
        console.log(e);
      });

      let data = SecureStore.getItemAsync("device_id");

      console.log("from store : " + data);

      return (
        <View></View>
      );
    };

export default Authenticate;