import React, { useState } from "react";
import DataService from "../services/Services";
import * as SecureStore from 'expo-secure-store';
import CheckState from "./CheckState";

const Authenticate = () => {

  const [deviceId, setDeviceId] = useState("");
    /*SecureStore.deleteItemAsync("device_id").then((reject) => {
    });*/

    SecureStore.getItemAsync("device_id").then((response) => {
      setDeviceId({"id" : response});
      console.log("stored id : " + response);
    });

    console.log("object id send to api : " + JSON.stringify(deviceId));

    DataService.getInfo(JSON.stringify(deviceId))
      .then((response) => {
        SecureStore.setItemAsync("device_id", response.id);
        setDeviceId({"id" : response.id});
        console.log("id recu de l'api : " + response.id);
        console.log(response.response);
      })
      .catch((e) => {
        console.log(e);
      });

      return (
        <CheckState/>
      );
    };
export default Authenticate;