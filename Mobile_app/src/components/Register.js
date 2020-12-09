import React, { useState } from "react";
import DataService from "../services/Services";
import { TextInput } from 'react-native-paper';

const Register = () => {
    const [firstname, setFirstname] = useState()
    const [lastname, setLastname] = useState()

    const handleSubmit = () => {
        if(firstname && lastname) {
            var fields = {
                firstname: firstname,
                lastname: lastname
              };
            DataService.sendRegister(fields)
            .then(response => {
                if(response.code == 1) {
                    history.push("/");
                } else {
                    alert(`Un problème est survenu, veuillez réessayer`);
                }
            })
            .catch(e => {
                console.log(e);
                alert(`Error : ${e}`);
            });
        }
    };

    const styles = StyleSheet.create({
        registerContainer: {
            flex: 1,
            backgroundColor: "#EEEEEE",
            flexDirection: "column",
            justifyContent: "center",
        }
    });

    return (
        <View style={styles.registerContainer}>
            <TextInput label="Prénom" value={prenom} onChangeText={text => setText(text)}/>
            <TextInput label="Nom" value={nom} onChangeText={text => setText(text)}/>
            <Button mode="contained" onPress={handleSubmit} style={styles.button} color="#6A137F">Je continue</Button>
        </View>
    );
}

export default Register