import React, { useState } from "react";
import DataService from "../services/Services";
import * as SecureStore from 'expo-secure-store';
import Expositions from "./Expositions";

function sendId(deviceId){

  console.log("object id send to api : " + JSON.stringify(deviceId));

  DataService.getInfo(JSON.stringify(deviceId))
    .then((response) => {
      SecureStore.setItemAsync("device_id", response.id);
      //setDeviceId({"id" : response.id});
      console.log("id recu de l'api : " + response.id);
      console.log(response.response);
      return response;
    })
    .catch((e) => {
      console.log(e);
    });
    return "";
}

const Authenticate = () => {
  
    //const [deviceId, setDeviceId] = useState("");
    //SecureStore.deleteItemAsync("device_id").then((reject) => {
    //});

    const resp = {code : 3, expositions : 5}

    SecureStore.getItemAsync("device_id").then((response) => {
      //setDeviceId({"id" : response});
      console.log("stored id : " + response);
      //let resp = sendId({'id' : response})
      }
    );

      return (
        <Expositions infections={resp}/>
      );
};
export default Authenticate;