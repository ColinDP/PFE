import React, { useState, useEffect } from "react";
import AskQRCodeForm from "components/CreateQRCodeContainer/AskQRCodeForm";
import { StyleSheet,Text, View, Image } from "react-native";
import Service from "services/Service";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "components/CreateQRCodeContainer/PDFDocument";
import { Card, ActivityIndicator, Button } from "react-native-paper";

const CreateQRCodeContainer = ({setDisplay}) => {
  const [images, setImages] = useState([]);
  const [showDownloadLink, setShowDownloadLink] = useState(false);
  const [charging, setCharging] = useState(false);
  const [received,setReceived] = useState(false);
  const [error,setError] = useState("");

  const handleFormSubmit = (data) => {
    setShowDownloadLink(false);
    setCharging(true);
    

    Service.askForQR(data)
      .then((resp) => {
        var images = [];
        for (var i = 0; i < resp.data.data.length; i++) {
        const image = resp.data.data[i].image;
        const name = resp.data.data[i].name;
        
          images.push({
            image:"data:image/png;base64," + image.substring(2, image.length - 1), name:name  
          });
        }
        setImages(images);
        setCharging(false);
        setShowDownloadLink(true);
        setReceived(false);
        setError("");
        console.log("1");
        //setTimeout('', 5000);
        //setDisplay(false);

      })
      .catch((error) => {
        setCharging(false);
        setShowDownloadLink(false);
        setReceived(true);
        setError(error.response.data.response)
      });
      
      
  };
  return (
    <Card style={styles.cardContainer}>
      <Card.Content>
        <AskQRCodeForm handleFormSubmit={handleFormSubmit} />
        {showDownloadLink ? (
          <Button style={styles.downloadButton}>
            <PDFDownloadLink
              document={<PDFDocument data={images} />}
              fileName="SaveLives.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Download Pdf"
              }
            </PDFDownloadLink>
          </Button>
        ) : (
          <ActivityIndicator animating={charging} size="small" />
        )}
        {received? <Text style={styles.text}>{`error:${error}`}</Text>:""}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: "80px",
    paddingBottom: "50px",
    borderColor: "#D3D3D3",
    borderWidth: "1px",
    borderRadius: "10px",
  },
  text:{
    color:"red",
  },
  downloadButton: {},
});

export default CreateQRCodeContainer;
