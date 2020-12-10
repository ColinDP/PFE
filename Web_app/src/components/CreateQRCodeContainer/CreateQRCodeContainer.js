import React, { useState, useEffect } from "react";
import AskQRCodeForm from "components/CreateQRCodeContainer/AskQRCodeForm";
import { StyleSheet, View, Image, Text } from "react-native";
import Service from "services/Service";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "components/CreateQRCodeContainer/PDFDocument";
import { Card, ActivityIndicator, Button } from "react-native-paper";

const CreateQRCodeContainer = ({ setQRList, QRList, handleList }) => {
  const [images, setImages] = useState([]);
  const [showDownloadLink, setShowDownloadLink] = useState(false);
  const [charging, setCharging] = useState(false);
  const [received, setReceived] = useState(false);
  const [error, setError] = useState("");

  const handleFormSubmit = (data) => {
    setShowDownloadLink(false);
    setCharging(true);

    Service.askForQR(data)
      .then((resp) => {
        console.log(resp.data);
        var array = [];
        for (var i = 0; i < resp.data.images.length; i++) {
          const image = resp.data.images[i];
          const count = 0;
          const name = resp.data.names[i];
          array.push({
            image:
              "data:image/png;base64," + image.substring(2, image.length - 1),
            count: count,
            name: name,
          });
        }
        handleList();
        //setQRList([...QRList, ...array]);
        setImages(array);
        setCharging(false);
        setShowDownloadLink(true);
        setReceived(false);
        setError("");
      })
      .catch((error) => {
        console.log(error);
        setCharging(false);
        setShowDownloadLink(false);
        setReceived(true);
        setError(error.response.data.response);
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
        {received && <Text style={styles.text}>{`error:${error}`}</Text>}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: "20px",
    paddingBottom: "20px",
    borderColor: "#D3D3D3",
    borderWidth: "1px",
    borderRadius: "10px",
    boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.1)",
    transition: "0.1s ease",
  },
  downloadButton: {},
  text: {
    textAlign: "center",
    fontSize: 10,
    color: "red",
  },
});

export default CreateQRCodeContainer;
