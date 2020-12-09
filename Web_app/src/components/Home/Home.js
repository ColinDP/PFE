import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import LogoutButton from "./LogoutButton";
import CreateQRCodeContainer from "components/CreateQRCodeContainer/CreateQRCodeContainer";
import ListQRCodes from "components/ListQRCodes/ListQRCodes";
import Service from "services/Service";



const Home = () => {

  const [datas,setDatas] = useState([]);
  const [display,setDisplay] = useState(false);

  
  const isEntreprise = JSON.parse(localStorage.getItem("user")).role=="E";

  const handleList = () =>{
    setDisplay(true);
    Service.listQR()
      .then((resp) => {    
        var array = []
        for (var i = 0; i < resp.data.data.length; i++) {
          const image = resp.data.data[i].image;
          const count = resp.data.data[i].count;
          const name = resp.data.data[i].name;
          array.push({
            image:"data:image/png;base64," + image.substring(2, image.length - 1), count:count, name:name
          });
          
        }
        setDatas(array) ;  
      })
      .catch((error) => {
        console.log(error);
      });
      
      
  }

  return (
    <>
      <LogoutButton />

      <CreateQRCodeContainer setDisplay={setDisplay}/>
      {console.log(datas)}
      {!display ? handleList() : isEntreprise  ? <ListQRCodes data={datas}/> : console.log("ok")}
      
    </>
  );
};

export default Home;
