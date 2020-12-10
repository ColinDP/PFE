import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Title, ActivityIndicator } from "react-native-paper";
import LogoutButton from "./LogoutButton";
import CreateQRCodeContainer from "components/CreateQRCodeContainer/CreateQRCodeContainer";
import ListQRCodes from "components/ListQRCodes/ListQRCodes";
import Service from "services/Service";

const Home = () => {
  const [QRList, setQRList] = useState([]);
  const [showQRList, setShowQRList] = useState(false);
  const [charging, setCharging] = useState(false);

  const isEntreprise = JSON.parse(localStorage.getItem("user")).role == "E";

  useEffect(() => {
    handleList();
  }, []);

  const handleList = () => {
    setShowQRList(false);
    setCharging(true);
    Service.listQR()
      .then((resp) => {
        var array = [];
        for (var i = 0; i < resp.data.data.length; i++) {
          const images = resp.data.data[i].image;
          const count = resp.data.data[i].count;
          const name = resp.data.data[i].name;
          array.push({
            image:
              "data:image/png;base64," + images.substring(2, images.length - 1),
            count: count,
            name: name,
          });
        }
        setQRList(array);
        setShowQRList(true);
        setCharging(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <LogoutButton />
      <View style={styles.row}>
        <View style={styles.col}>
          <CreateQRCodeContainer
            setQRList={setQRList}
            QRList={QRList}
            handleList={handleList}
          />
        </View>
        {isEntreprise && (
          <View style={styles.col}>
            <Card style={styles.cardContainer}>
              <Title style={styles.title}> Liste de vos QR Codes </Title>
              <Card.Content style={styles.cardContent}>
                {showQRList ? (
                  <ListQRCodes data={QRList} />
                ) : (
                  <ActivityIndicator animating={charging} size="large" />
                )}
              </Card.Content>
            </Card>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
  cardContent: {
    padding: "50px",
  },
  cardContainer: {
    width: "450px",
    height: "300px",
    paddingTop: "20px",
    paddingBottom: "20px",
    borderColor: "#D3D3D3",
    borderWidth: "1px",
    borderRadius: "10px",
    boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.1)",
    transition: "0.1s ease",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  col: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
});

export default Home;
