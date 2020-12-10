import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import DataService from "../services/Services";
// import { createBrowserHistory } from "history";
import { useHistory } from "react-router-dom"
import * as SecureStore from 'expo-secure-store';
import { showMessage, FlashMessage } from "react-native-flash-message";

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
        switch (response.code){
          case 0:
            showMessage({
              message: "Echec du scan",
              description: "Ce code n'est pas valide",
              icon: "warning",
              type: "warning",
            });
            break;
          case 1:
            showMessage({
              message: "Echec du scan",
              description: "Ce code a déjà été scanné",
              icon: "warning",
              type: "warning",
            });
          break;
        case 2:
            showMessage({
              message: "Scan effectué",
              icon: "success",
              type: "success",
            });
        break;
        }
      }).catch(e => {
        console.log(e);
        showMessage({
          message: "Echec du scan",
          description: "Ce code n'est pas valide",
          icon: "warning",
          type: "warning",
        });
      });
    history.push("/");
  }

  if (hasPermission === null) {
    return <Text>Demande d'autorisation pour utiliser la camera</Text>;
  }
  if (hasPermission === false) {
    return <Text>Pas d'accès à la camera</Text>;
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

      {<Button color="#6A137F" title={'Retour'} onPress={() => history.push("/")} />}
    </View>
  );
}