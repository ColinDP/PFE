import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import LogoutButton from "./LogoutButton";
import CreateQRCodeContainer from "components/CreateQRCodeContainer/CreateQRCodeContainer";
import ListQRCodes from "components/ListQRCodes/ListQRCodes";
import Service from "services/Service";



const Home = () => {

  const [datas,setDatas] = useState([]);
  const [display,setDisplay] = useState(false);
  const [count,setCount] = useState(0);
  
  const isEntreprise = JSON.parse(localStorage.getItem("user")).role=="E";

  const handleList = () =>{
    setDisplay(true);
    setCount(count+1)
    Service.listQR()
      .then((resp) => {    
        var array = []
        for (var i = 0; i < resp.data.data.length; i++) {
          const images = resp.data.data[i].images;
          const count = resp.data.data[i].count;
          array.push({
            image:"data:image/png;base64," + images.substring(2, images.length - 1), count:count
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
      <CreateQRCodeContainer />
      {!display ? handleList() : isEntreprise  ? <ListQRCodes data={datas}/> : console.log("ok")}
      
    </>
  );
};

export default Home;
