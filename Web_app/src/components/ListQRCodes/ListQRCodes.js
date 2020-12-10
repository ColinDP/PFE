import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import Service from "services/Service";
import { Card, Button, DataTable } from "react-native-paper";

const ListQRCodes = ({ data }) => {
  const [codes, setCodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 1;

  useEffect(() => {
    if (data.length > 0) {
      const array = [];
      for (var i = 0; i < data.length; i++) {
        const temp = (
          <DataTable.Row key={i}>
            <DataTable.Cell>{data[i].name}</DataTable.Cell>
            <DataTable.Cell>
              <Image style={styles.image} source={data[i].image} />
            </DataTable.Cell>
            <DataTable.Cell numeric>{data[i].count}</DataTable.Cell>
          </DataTable.Row>
        );
        array.push(temp);
      }
      setCodes(array);
    }
  }, [data]);

  if (data.length === 0)
    return (
      <Text style={styles.text}>Vous n'avez pas de QR Codes à afficher</Text>
    );
  else
    return (
      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={styles.statistics}>Name</DataTable.Title>
          <DataTable.Title style={styles.statistics}>QR Code</DataTable.Title>
          <DataTable.Title numeric style={styles.statistics}>
            nbr of scans
          </DataTable.Title>
        </DataTable.Header>

        {codes[currentPage]}

        <DataTable.Pagination
          page={currentPage}
          numberOfPages={codes.length}
          perPage={itemsPerPage}
          onPageChange={(page) => {
            setCurrentPage(page);
          }}
          label={`${currentPage + 1} of ${codes.length}`}
        />
      </DataTable>
    );
};
const styles = StyleSheet.create({
  statistics: {
    paddingLeft: 25,
    paddingRight: 25,
    width: "100%",
  },
  text: {
    textAlign: "center",
    color: "red",
  },
  image: {
    display: "block",
    height: "100",
    width: "100",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 40,
    backgroundColor: "red",
    objectFit: "cover",
  },
});

export default ListQRCodes;
