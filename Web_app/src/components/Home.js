import React, { useState } from "react";
import { Button,Image,StyleSheet,View,Text } from 'react-native';
import Service from "../services/Service";
import CustomInput from "./CustomInput";
import { Formik, Field } from "formik";
import * as yup from "yup";
import GeneratePDF from "./GeneratePDF";



const loginSchema = yup.object({
    quantity: yup.number().required("quantity is required"),
    quantity: yup.number().typeError("That doesn't look like a number")
  });


const Home = () => {

  const [QRImage,setQRImage] = useState(<div></div>)
  const [QRButton,setQRButton] = useState(<div></div>)
  const [PDF,setPDF] = useState(<div></div>)



  const handleSubmitPDF = (testB64String,quantity) => {
    setPDF(<GeneratePDF quantity={quantity} image={testB64String}/>)
  }

  return (
    <div>
     <Formik
      style={styles.container}
      initialValues={{ quantity: 1 }}
      onSubmit={(data, actions) => {
        
        setQRImage(<p>waiting...</p>);
        Service.askForQR(data).then((resp) =>{
          const imageStringBase64 = resp.data.image.substring(2,resp.data.image.length -1);
          setPDF(<p></p>);
          setQRButton(<Button onPress={handleSubmitPDF(`data:image/png;base64,${imageStringBase64}`,data.quantity)} title="Generate PDF" color="#FFD700"/>)
          setQRImage(<Image style={{ flex: 0.2,width:500, height:500,borderRadius: 20}} source={{uri: `data:image/jpeg;base64,${imageStringBase64}`}}/>);      
          
        }) 
      }}
      validationSchema={loginSchema}
    >
      {({ handleSubmit, isValid }) => (
        <View style={styles.loginContainer}>
          <Text>How many QR Codes do you need? (example: 8)</Text>
          <Field component={CustomInput} name="quantity" placeholder="1"  type="number" min="1" max="30"/> 
          
          {/*<input style={{margin:20,padding:15}} type="number" min="1" max="30" name="quantity" placeholder="How many QR Codes do you need? (example: 8)" />*/}
          
        {/*isValid?"true":"false"*/}
        <Button
            onPress={handleSubmit}
            title="Ask QR Code Now"
            color="#841584"
            accessibilityLabel="Generate A Usable QRCode"
            disabled= {!isValid}  
        />
        {QRButton}
        </View>
      )}
    </Formik>    
    <div>{QRImage}</div>
    
    <View  >{PDF}</View>
   
    
    </div>
  );
};

const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
    },
    loginContainer: {
      width: "30%",
      alignItems: "center",
      backgroundColor: "white",
      padding: 10,
      elevation: 10,
      backgroundColor: "#e6e6e6",
      justifyContent: "center",
    },
    QR:{
      height:100,
      scale:0.5
    }
  });
  

export default Home;