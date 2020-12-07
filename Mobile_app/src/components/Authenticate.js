import React, { useState, useEffect } from "react";
import DataService from "../services/Services";
import * as SecureStore from 'expo-secure-store';
import Expositions from "./Expositions";


const Authenticate = () => {
  const [resp, setResp] = useState()

  useEffect(() => {
      SecureStore.getItemAsync("device_id")
          .then((response) => {
              console.log("stored id : " + response)
              const deviceId = { id: response }

              console.log("object id send to api : " + JSON.stringify(deviceId))
              return DataService.getInfo(JSON.stringify(deviceId))
          })
          .then((response) => {
            setResp(response)
          })
          .catch((e) => {
              console.log(e)
          })
  }, [])

  return resp ? <Expositions response={resp} /> : null
}

export default Authenticate
