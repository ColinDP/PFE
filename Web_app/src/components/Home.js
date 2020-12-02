import React, { useState } from "react";
import DataService from "../services/Service";
import { Button } from 'react-native';


const Home = () => {
  const initialDemandState = {
    id: null,
    quantity: "1"
  };
  const [data, setData] = useState(initialDemandState);
  const [submitted, setSubmitted] = useState(false);

  const saveData = () => {
    var data = {
      quantity: "2"
    };

    DataService.askForQR(data)
      .then(response => {
        setData({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div >
      <Button
        onPress={saveData}
        title="Ask QR Code Now"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </div>
  );
};

export default Home;