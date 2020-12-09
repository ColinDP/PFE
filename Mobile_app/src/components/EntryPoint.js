import React, { useState, useEffect } from "react";
import DataService from "../services/Services";
import * as SecureStore from 'expo-secure-store';
import HomeScreen from "./HomeScreen";

const EntryPoint = () => {
  const [resp, setResp] = useState()

  useEffect(() => {

      SecureStore.deleteItemAsync("device_id")
      // SecureStore.setItemAsync("device_id", "Simon-fab9a071-66e7-4856-8789-7b2375980c15")

      SecureStore.getItemAsync("device_id")
        .then((response) => {
          const fields = {
            id: response
          }
          console.log("CURRENT ID : " + fields.id)
          return DataService.contactServer(JSON.stringify(fields))
        })
        .then((response) => {
          setResp(response);
          if(response.id !== undefined) {
            console.log("NEW ID : " + response.id)
            SecureStore.setItemAsync("device_id" , response.id)
            history.push("/register")
          }
        })
        .catch((e) => {
            console.log(e)
        })
  }, [])

  return resp ? <HomeScreen response={resp} /> : null
}

export default EntryPoint