import React, {useState} from 'react';
import DataService from "../services/Service";
import { Text, View, TextInput,Button} from 'react-native';

const RegisterForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const initialTutorialState = {
        id: null,
        title: "",
        description: "",
        published: false
      };
      const [data, setData] = useState(initialTutorialState);
      const [submitted, setSubmitted] = useState(false);

      const saveData = () => {
        var data2 = {
          title: name,
          description: email
        };

        DataService.create(data2)
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
    <View>
      <Text> Login Form </Text>
      <View>
        <TextInput 
         placeholder="Enter Email" 
         onChangeText={(text) => {setEmail(text)}}
        />
        <TextInput
          placeholder="Enter Name"
          onChangeText={(text) => {setName(text)}}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Enter Password"
        />
      </View>
      <Button
            onPress={saveData}
            title="Register"
            color="green"
            accessibilityLabel="Learn more about this purple button"
        />
    </View>
  );
};

export default RegisterForm;