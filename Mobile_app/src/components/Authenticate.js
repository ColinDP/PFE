import React, { useState, useEffect } from "react";
import DataService from "../services/Services";
import * as SecureStore from 'expo-secure-store';
import Expositions from "./Expositions";


const Authenticate = () => {
  const [code, setCode] = useState()

  useEffect(() => {
      SecureStore.getItemAsync("device_id")
          .then((response) => {
              console.log("stored id : " + response)
              const deviceId = { id: response }

              console.log("object id send to api : " + JSON.stringify(deviceId))
              return DataService.getInfo(JSON.stringify(deviceId))
          })
          .then((response) => {
              setCode({ code: 3 , expositions : 6 })
          })
          .catch((e) => {
              console.log(e)
          })
  }, [])

  return code ? <Expositions infections={code} /> : null
}

export default Authenticate
