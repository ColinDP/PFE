import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const PDFDocument = ({ data }) => {
  return (
    <Document>
      {data.map((image, index) => (
        <Page key={index} style={styles.page} size="A4">
          <View style={styles.section}>
            <Text>Scan me to save lives!!</Text>
            <Image style={styles.image} source={image} />
          </View>
        </Page>
      ))}
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    width: "100%",
    textAlign: "center",
  },
  image: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "50%",
    padding: 10,
    backgroundColor: "red",
    objectFit: "cover",
  },
  section: {
    width: "100%",
    height: "100%",
    flexGrow: 1,
  },
  QR: {
    height: 500,
    scale: 0.5,
  },
  footer: {
    height: 100,
  },
});

export default PDFDocument;