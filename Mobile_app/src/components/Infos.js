import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { DefaultTheme, Provider, Avatar, Card, Title, Paragraph } from 'react-native-paper';

const Infos = ({response}) => {
    function renderSwitch(response){
      switch(response.code){
        case 0:
          return <>
            <Card.Title title="Un problème est survenu"/>
              <Card.Content>
                <Paragraph>Nous rencontrons quelques problèmes, veuillez réessayer plus tard</Paragraph>
              </Card.Content>
          </>;
        case 1:
          return <>
            <Card.Title title="Ce téléphone a été enregistré"/>
              <Card.Content>
                <Paragraph>Bienvenue, commençez par scanner des codes QR</Paragraph>
              </Card.Content>
          </>;
        case 2:
          return <>
            <Card.Title title="Aucune exposition récente"/>
              <Card.Content>
                <Paragraph>Aucune exposition constatée lors des 10 derniers jours</Paragraph>
              </Card.Content>
          </>;
        case 3:
          return <>
            <Card.Title title="{response.expositions} expositions récentes"/>
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
export default Infos;