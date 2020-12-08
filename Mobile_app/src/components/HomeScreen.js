import React from "react";
import { useHistory } from "react-router-dom"
import { StyleSheet, View, Text, Image} from "react-native";
import { Button } from 'react-native-paper';
import Authenticate from "./Authenticate";
  
const HomeScreen = () => {
  
    const history = useHistory()

    const handleGoScan = () => {
        history.push("/scan");
    };
      
    const styles = StyleSheet.create({
        homeContainer: {
            flex: 1,
            backgroundColor: "#EEEEEE",
            flexDirection: "column",
            justifyContent: "center",
        },
        buttonContainer: {
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            marginBottom:-90
        },
        button: {
            margin: 95,
            padding: 8
        },
        infoContainer: {
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
        },
        titleContainer: {
            padding: 55,
            marginBottom: 10,
            flexDirection: "column",
            justifyContent: "center",
        },
        title1: {
            marginLeft: -35,
            color: "purple",
            textAlign: "left",
            fontSize: 20,
            fontWeight: "bold"
        },
        tinyLogo:{
            width: 300,
            height: 50,
        }
    });
  
    return (
        <View style={styles.homeContainer}>
        <View style={styles.titleContainer}>
            <Image style={styles.tinyLogo} source={{uri :'https://i.ibb.co/MV7vG8p/blockcovid-logo.png'}}></Image>
        </View>
        <View style={styles.infoContainer}>
                <Authenticate />
        </View>
            <View style={styles.buttonContainer}>
                <Button icon="camera" mode="contained" onPress={handleGoScan} style={styles.button} color="#6A137F">
                    Scanner un code QR
                </Button>
            </View>
        </View>
    );
};
  
export default HomeScreen;