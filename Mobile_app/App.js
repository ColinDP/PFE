import React from 'react';
import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

const App = () => {

  const theme = {
    ...DefaultTheme,
    //roundness: 15,
    colors: {
      ...DefaultTheme.colors,
      //primary: "#03dac6",
      accent: "#f1c40f",
      error: "#ff0f0f",
    },
    fonts: {
      fontWeight: "light",
    },
  };

  return (
    <PaperProvider theme={theme}>
      <NativeRouter>
        <Main />
      </NativeRouter>
    </PaperProvider>
    );
};

export default App;
