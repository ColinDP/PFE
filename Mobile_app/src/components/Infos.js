import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { DefaultTheme, Provider, Avatar, Card, Title, Paragraph } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faVirus, faHistory, faUserSecret} from '@fortawesome/free-solid-svg-icons'

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
          <Card elevation={25} style={styles.cardNoSignal}>
          <Card.Title titleStyle={styles.textTitleNoSignal} title="Votre téléphone a été enregistré"/>
            <Card.Content style={styles.content} >
              <FontAwesomeIcon icon={ faUserSecret } color={'black'} size={15}/>
              <Paragraph style={styles.textNoSignal}>Commençez par scanner des codes QR</Paragraph>
            </Card.Content>
            </Card>
          </>;
        case 2:
          return <>
          <Card elevation={25} style={styles.cardGreen}>
          <Card.Title titleStyle={styles.textTitle} title="Rien à signaler"/>
            <Card.Content style={styles.content} >
              <FontAwesomeIcon icon={ faVirus } color={'white'} size={15}/>
              <Paragraph style={styles.text}>Aucune exposition constatée lors des 10 derniers jours</Paragraph>
            </Card.Content>
            <Text></Text>
            <Card.Content style={styles.content}>
              <FontAwesomeIcon icon={ faHistory } color={'white'} size={15}/>
              <Paragraph style={styles.text}>Mise à jour : {datetime}</Paragraph>
            </Card.Content>
            </Card>
          </>;
        case 3:
          return <>
            <Card elevation={25} style={styles.cardRed}>
            <Card.Title titleStyle={styles.textTitle} title="Vous avez été exposé"/>
              <Card.Content style={styles.content} >
                <FontAwesomeIcon icon={ faVirus } color={'white'} size={15}/>
                <Paragraph style={styles.text}>Vous avez été exposé {response.expositions} fois lors des 10 derniers jours</Paragraph>
              </Card.Content>
              <Text></Text>
              <Card.Content style={styles.content}>
                <FontAwesomeIcon icon={ faHistory } color={'white'} size={15}/>
                <Paragraph style={styles.text}>Mise à jour : {datetime}</Paragraph>
              </Card.Content>
              </Card>
            </>;
      }
    }
    const styles = StyleSheet.create({
      content:{
        flexGrow: 3,
        flexDirection: 'row',
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
      return (
      <>        
        <Card elevation={50} style={styles.cardNoSignal}>
          <Card.Title titleStyle={styles.textTitleNoSignal} title="Protégez les autres"/>
            <Card.Content style={styles.content} >
              <Paragraph style={styles.textNoSignal}>Merci d'avoir téléchargé l'app !</Paragraph>
            </Card.Content>
            <Card.Content style={styles.content} >
              <Paragraph style={styles.textNoSignal}>Dorénavant, vous aussi vous êtes acteur de la lutte contre l'épidemie.</Paragraph>
            </Card.Content>
        </Card>
        {renderSwitch(response)}
        </>
      );
};
export default Infos;