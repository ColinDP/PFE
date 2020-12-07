import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import DataService from "../services/Services";
// import { createBrowserHistory } from "history";
import { useHistory } from "react-router-dom"

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

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const sendMobileScan = async ({ data }) => {
    setScanned(true);
    var fields = {
      QRCodeContent: data,
      phoneId: await(SecureStore.getItemAsync("device_id")),
      scanDate: Date.now()
    };
    // DataService.sendMobileScan(fields)
    //   .then(response => {
    //     console.log(response.message);
    //     alert(`Response : ${response.message}`);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //     alert(`Error : ${e}`);
    //   });
    console.log(phoneId);
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