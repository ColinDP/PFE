import React from "react";
import { useHistory } from "react-router-dom"
import { StyleSheet, View, Text, Button } from "react-native";
import PageTest from "./PageTest";
  
const HomeScreen = () => {
  
    const history = useHistory()

    const handleGoScan = () => {
        history.push("/scan");
    };
      
    const styles = StyleSheet.create({
        homeContainer: {
            flex: 1,
            backgroundColor: "#fff",
            flexDirection: "column",
            justifyContent: "center",
        },
        buttonContainer: {
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
        },
        button: {
            
        },
        infoContainer: {
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
        },
        titleContainer: {
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
        },
        title1: {
            color: "purple",
            textAlign: "center",
            fontSize: 50,
            fontWeight: "bold"
        },
    });
  
    return (
        <View style={styles.homeContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title1}>Bienvenue</Text>
            </View>
            <View style={styles.infoContainer}>
                <PageTest />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.button}
                    onPress={handleGoScan}
                    title="Scanner un code QR"
                    color="#841584"
                />
            </View>
        </View>
    );
};
  
export default HomeScreen;