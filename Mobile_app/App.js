import React from 'react';
// import { NativeRouter } from 'react-router-native';
import { BrowserRouter } from "react-router-dom";
import Main from './src/components/Main';

const App = () => {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
    );
};

export default App;
