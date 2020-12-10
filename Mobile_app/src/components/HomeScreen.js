import React from "react";
import { useHistory } from "react-router-dom"
import { StyleSheet, View, Text, Image} from "react-native";
import { Button } from 'react-native-paper';
import { setStatusBarBackgroundColor, setStatusBarStyle, setStatusBarTranslucent, StatusBar } from 'expo-status-bar';
import Authenticate from "./Authenticate";
import FlashMessage from "react-native-flash-message";
  
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
            flex: 0.3,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        },
        button: {
            width: "65%",
            height: "50%",
            textAlign: "center",
            justifyContent: "center",
        },
        infoContainer: {
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
        },
        titleContainer: {
            flex: 0.3,
            flexDirection: "column",
            justifyContent: "center",
        },
        tinyLogo:{
            marginTop: "8%",
            flex: 0.8,
        }
    });
    setStatusBarBackgroundColor("#6A137F");
    setStatusBarStyle("light");
    return (
        <View style={styles.homeContainer}>
            <FlashMessage position="top" />
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