import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import DataService from "../services/Services";
// import { createBrowserHistory } from "history";
import { useHistory } from "react-router-dom"
import * as SecureStore from 'expo-secure-store';

export default function Scan() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const history = useHistory()

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const sendMobileScan = async ({ data }) => {
    console.log(data)
    setScanned(true);
    var phone_Id = await(SecureStore.getItemAsync("device_id"))
    var fields = {
      QRCodeContent: data,
      phoneId: phone_Id
    };
    DataService.sendMobileScan(fields)
      .then(response => {
        if(response.code == 1){
          alert(`Scan réussi`);
        } else {
          alert(`Un problème est survenu lors du scan, veuillez réessayer`);
        }
      })
      .catch(e => {
        console.log(e);
        alert(`Error : ${e}`);
      });
    history.push("/");
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : sendMobileScan}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}