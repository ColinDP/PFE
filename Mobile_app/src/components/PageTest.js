import React, { useState } from "react";
import DataService from "../services/Service";
import { Button } from 'react-native';


const PageTest = () => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [data, setData] = useState(initialTutorialState);
  const [submitted, setSubmitted] = useState(false);

  const saveData = () => {
    var data = {
      title: "coucou",
      description: "help"
    };

    DataService.create(data)
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
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </div>
  );
};

export default PageTest;
