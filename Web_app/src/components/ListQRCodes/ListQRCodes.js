import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image,Text } from "react-native";
import Service from "services/Service";
import { Card, Button,DataTable } from "react-native-paper";

const ListQRCodes = ({data}) => {
    
    const [codes, setCodes] = useState([]);
    const [currentPage,setCurrentPage] = useState(0);
    const [load,setLoad]=useState(true);

    const itemsPerPage = 1;



    if(data.length > 0 && load){

        const array= []
        for(var i=0;i<data.length;i++){
          const temp = (
              <DataTable.Row key={i}>
                  <DataTable.Cell><Image style={styles.image} source={data[i].image} /></DataTable.Cell>
                  <DataTable.Cell numeric>{data[i].count}</DataTable.Cell>
              </DataTable.Row>
              )
              array.push(temp)
                
        }
        setLoad(false);
        setCodes(array);
    } 
    return (
        <Card.Content>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>QR Code</DataTable.Title>
              <DataTable.Title numeric>nbr of scans</DataTable.Title>
            </DataTable.Header>

          {codes[currentPage]}     

          <DataTable.Pagination
              page={currentPage}
              numberOfPages={codes.length}
              perPage={itemsPerPage}
              onPageChange={page => {
                setCurrentPage(page)
              }}
              label={`${currentPage+1} of ${codes.length}`}
            />
          </DataTable>         
        </Card.Content>   
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
    image: {
        display: "block",
        height:"100",
        width: "100",
        marginLeft: "auto",
        marginRight: "auto",
        padding: 40,
        backgroundColor: "red",
        objectFit: "cover",
      }
  });
  
  export default ListQRCodes;
  