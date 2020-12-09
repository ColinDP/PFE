import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { DefaultTheme, Provider, Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faVirus, faHistory, faUserSecret, faQrcode } from '@fortawesome/free-solid-svg-icons'

let currentdate = new Date(); 
let datetime = currentdate.getDate() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getFullYear() + " à "
                + currentdate.getHours() + ":"  
                + (currentdate.getMinutes() <10 ?'0':'') + currentdate.getMinutes()

const Infos = ({response}) => {
    console.log(response);

    function renderSwitch(response){
      switch(response.code){
        case 0:
          return <>
            <Card.Title title="Erreur"/>
              <Card.Content>
                <Paragraph>Un problème est survenu</Paragraph>
              </Card.Content>
          </>;
        case 1:
          return <>
          <Card elevation={10} style={styles.cardNoSignal}>
          <Card.Title titleStyle={styles.textTitleNoSignal} title="Appareil enregistré"/>
            <Card.Content style={styles.content} >
              <FontAwesomeIcon icon={ faQrcode } color={'black'} size={15}/>
              <Paragraph style={styles.textNoSignal}>Commençez par scanner des codes QR</Paragraph>
            </Card.Content>
            </Card>
          </>;
        case 2:
          return <>
          {/* <Card elevation={10} style={styles.cardGreen}>
          <Card.Title titleStyle={styles.textTitle} title="Vous n'avez pas été exposé"/>
            <Card.Content style={styles.content} >
              <FontAwesomeIcon icon={ faVirus } color={'white'} size={15}/>
              <Paragraph style={styles.text}>Aucune exposition détectée lors des 10 derniers jours</Paragraph>
            </Card.Content>
            <Card.Content style={styles.content}>
              <FontAwesomeIcon icon={ faHistory } color={'white'} size={15}/>
              <Paragraph style={styles.text}>Mise à jour : {datetime}</Paragraph>
            </Card.Content>
            </Card> */}
            <Card elevation={10} style={styles.cardNoSignal}>
          <Card.Title titleStyle={styles.textTitleNoSignal} title="Appareil enregistré"/>
            <Card.Content style={styles.content} >
              <FontAwesomeIcon icon={ faQrcode } color={'black'} size={15}/>
              <Paragraph style={styles.textNoSignal}>Scanner des codes QR pour que nous puissions assurer votre suivi</Paragraph>
            </Card.Content>
            </Card>
          </>;
        case 3:
          return <>
            <Card elevation={10} style={styles.cardRed}>
            <Card.Title titleStyle={styles.textTitle} title="Vous avez été exposé"/>
              <Card.Content style={styles.content} >
                <FontAwesomeIcon icon={ faVirus } color={'white'} size={15}/>
                <Paragraph style={styles.text}>Vous avez été exposé {response.expositions} fois lors des 10 derniers jours</Paragraph>
              </Card.Content>
              <Card.Content style={styles.content}>
                <FontAwesomeIcon icon={ faHistory } color={'white'} size={15}/>
                <Paragraph style={styles.text}>Mise à jour : {datetime}</Paragraph>
              </Card.Content>
              </Card>
            </>;
      }
    }
    const styles = StyleSheet.create({
      icon:{
        flexDirection: "column",
        justifyContent: "center",
      },
      content:{
        flexDirection: 'row',
        alignItems: "center",
        margin: 5
      },
      textTitle :{
        fontWeight: 'bold',
        color : '#FFFFFF',
        textAlign: "left",
      },
      textTitleNoSignal :{
        fontWeight: 'bold',
        color : '#6A137F',
        textAlign: "left"
      },
      text :{
        color : '#FFFFFF',
        marginLeft: "8%",
        fontSize : 16
      },
      textNoSignal :{
        color : '#000000',
        marginLeft: "8%",
        fontSize : 16
      },
      textWelcome :{
        color : '#000000',
        fontSize : 16
      },
      cardNoSignal: {
        flex: 1,
        marginTop: "4%",
        width: "90%",
        padding: "3%",
        alignContent: "center",
        backgroundColor: '#FFFFFF'
      },
      cardGreen: {
        flex: 1,
        marginTop: "4%",
        width: "90%",
        padding: "3%",
        alignContent: "center",
        backgroundColor: '#4C9D55'
      },
      cardRed: {
        flex: 1,
        marginTop: "4%",
        width: "90%",
        padding: "3%",
        alignContent: "center",
        backgroundColor: '#d9534f'
      },
      icon:{
        color:'#6A137F'
      },
      cardContainer:{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }
    });
      return (
        <View style={styles.cardContainer}>
          <Card elevation={10} style={styles.cardNoSignal}>
            <Card.Title titleStyle={styles.textTitleNoSignal} title="Bienvenue"/>
              <Card.Content style={styles.content} >
                <Paragraph style={styles.textWelcome}>Merci d'avoir téléchargé l'app !</Paragraph>
              </Card.Content>
              <Card.Content style={styles.content} >
                <Paragraph style={styles.textWelcome}>Vous êtes à présent acteur de la lutte contre l'épidemie.</Paragraph>
              </Card.Content>
          </Card>
          {renderSwitch(response)}
        </View>
      );
};
export default Infos;