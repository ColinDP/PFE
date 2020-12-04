import React, { useState } from "react";
import DataService from "../services/Services";
import * as SecureStore from 'expo-secure-store';
import CheckState from "./CheckState";
import { StyleSheet, View, Text, Button } from "react-native";

const Authenticate = () => {

    const [id, setId] = useState("");

    let data = SecureStore.getItemAsync("device_id");
    console.log("from store : " + data); //a regler

    DataService.getInfo(data)
      .then((response) => {
        SecureStore.setItemAsync("device_id", response.data.device_id);
        console.log(response.data.device_id);
      })
      .catch((e) => {
        console.log(e);
      });
      
    /*DataService.getDeviceId()
      .then((response) => {



        console.log(response.data.device_id);
      })
      .catch((e) => {
        console.log(e);
      });*/


      return (
        <CheckState/>
      );
    };
export default Authenticate;