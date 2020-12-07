import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { DefaultTheme, Provider, Avatar, Card, Title, Paragraph } from 'react-native-paper';

const Expositions = ({infections}) => {
    console.log(infections);

    function renderSwitch(code){
      switch(code){
        case 0:
          return <>
              <Card.Title title="Risque faible"/>
                <Card.Content>
                    <Paragraph>Pas d'exposition jusqu'a présent</Paragraph>
                </Card.Content>
              </>;
        case 3:
          return <>
          <Card.Title title="Risque plus élevé"/>
            <Card.Content>
              <Paragraph>{infections.expositions} exposition(s)</Paragraph>
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
          {renderSwitch(infections.code)}
        </Card>
      );
};
export default Expositions;