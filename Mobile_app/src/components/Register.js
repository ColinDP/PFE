import React, { useState, useEffect } from "react";
import DataService from "../services/Services";
import * as SecureStore from 'expo-secure-store';
import { StyleSheet, View, Text} from "react-native";
import { TextInput, DefaultTheme, Provider, Avatar, Card, Button, Paragraph } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faVirus, faHistory, faUserSecret} from '@fortawesome/free-solid-svg-icons'

const Register = ( )=> {
  const [prenom, setPrenom] = useState()
  const [nom, setNom] = useState()
  const [tel, setTel] = useState()

  const handleSubmit = () => {
    //history.push("/scan");
};

  const styles = StyleSheet.create({
    content:{
      flexGrow: 3,
      flexDirection: 'row',
    },
    button: {
      margin: 95,
      padding: 8
    },
    textTitle :{
      fontWeight: 'bold',
      color : '#FFFFFF',
      marginLeft: 40
    },
    textTitleNoSignal :{
      fontWeight: 'bold',
      color : '#6A137F',
      marginLeft: 40
    },
    text :{
      color : '#FFFFFF',
      marginLeft: 25,
      fontSize : 16
    },
    textNoSignal :{
      color : '#000000',
      marginLeft: 25,
      fontSize : 16
    },
    cardNoSignal: {
      borderColor:'#6A137F',
      margin: 12,
      paddingBottom: 25,
      padding: 12,
      backgroundColor: '#FFFFFF'
    },
    cardGreen: {
      margin: 12,
      paddingBottom: 25,
      padding: 12,
      backgroundColor: '#4C9D55'
    },
    cardRed: {
      margin: 12,
      paddingBottom: 25,
      padding: 12,
      backgroundColor: '#F45656'
    },
    cardNormal: {
      margin: 12,
      paddingBottom: 25,
      padding: 12,
      backgroundColor: '#FFFFFF'
    },
    icon:{
      color:'#6A137F'
    }
  });
    
  return (<>
    <Card elevation={50} style={styles.cardNoSignal}>
    <Card.Title titleStyle={styles.textTitleNoSignal} title="Protégez les autres"/>
      <Card.Content style={styles.content} >
        <Paragraph style={styles.textNoSignal}>Merci d'avoir téléchargé l'app !</Paragraph>
      </Card.Content>
      <Card.Content style={styles.content} >
        <Paragraph style={styles.textNoSignal}>Dorénavant, vous êtes vous aussi acteur de la lutte contre l'épidemie.</Paragraph>
    </Card.Content>
    <Card.Content style={styles.content} >
        <Paragraph style={styles.textNoSignal}>Si vous souhaitez rester anonyme, ignorer le formulaire.</Paragraph>
    </Card.Content>
    <Card.Content style={styles.content} >
    </Card.Content>
  </Card>
      <TextInput label="Prénom" value={prenom} onChangeText={text => setText(text)}/>
      <TextInput label="Nom" value={nom} onChangeText={text => setText(text)}/>
      <TextInput label="Téléphone" value={tel} onChangeText={text => setText(text)}/>
      <Button mode="contained" onPress={handleSubmit} style={styles.button} color="#6A137F">Je continue</Button>
    </>
    );
}

export default Register
