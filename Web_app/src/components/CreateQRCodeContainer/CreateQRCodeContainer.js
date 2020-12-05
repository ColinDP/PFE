import React, { useState, useEffect } from "react";
import AskQRCodeForm from "components/CreateQRCodeContainer/AskQRCodeForm";
import { StyleSheet, View, Image } from "react-native";
import Service from "services/Service";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "components/CreateQRCodeContainer/PDFDocument";
import { Card, ActivityIndicator, Button } from "react-native-paper";

const CreateQRCodeContainer = () => {
  const [images, setImages] = useState([]);
  const [showDownloadLink, setShowDownloadLink] = useState(false);
  const [charging, setCharging] = useState(false);

  const handleFormSubmit = (data) => {
    setShowDownloadLink(false);
    setCharging(true);
    const payload = { ...data };

    Service.askForQR(data).then((resp) => {
      const image = resp.data.images;
      var images = [];
      for (var i = 0; i < image.length; i++) {
        images.push(
          "data:image/png;base64," + image[i].substring(2, image[i].length - 1)
        );
      }
      setImages(images);
      setCharging(false);
      setShowDownloadLink(true);
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
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: "80px",
    paddingBottom: "80px",
    borderColor: "#D3D3D3",
    borderWidth: "1px",
    borderRadius: "10px",
  },
  downloadButton: {},
});

export default CreateQRCodeContainer;
