import React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import App from "components/App";
import "css/style.css";

/* const fontConfig = {
  default:{
    regular:{

    }
  }
} */

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

function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

export default Main;
