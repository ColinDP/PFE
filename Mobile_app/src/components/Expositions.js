import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { DefaultTheme, Provider, Avatar, Card, Title, Paragraph } from 'react-native-paper';

const Expositions = ({response}) => {
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
            <Card.Title title="Votre téléphone a été enregistré"/>
              <Card.Content>
                <Paragraph>Commençez par scanner des codes QR</Paragraph>
              </Card.Content>
          </>;
        case 2:
          return <>
            <Card.Title title="Rien à signaler"/>
              <Card.Content>
                <Paragraph>Aucune exposition constatée lors des 10 derniers jours</Paragraph>
              </Card.Content>
          </>;
        case 3:
          return <>
            <Card.Title title="Vous avez été exposé"/>
              <Card.Content>
                <Paragraph>Vous avez été exposé {response.expositions} fois lors des 10 derniers jours</Paragraph>
              </Card.Content>
          </>;
      }
    }
    const theme = {
      ...DefaultTheme,
      roundness: 6,

    };
      return (
        <Card elevation={3} style={theme} >
          {renderSwitch(response)}
        </Card>
      );
};
export default Expositions;