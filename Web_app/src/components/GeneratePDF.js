import React, { useState } from "react";
import { Document, Page,Image, Text, View, StyleSheet } from "@react-pdf/renderer";
import ReactDOM from 'react-dom';
import test from '../assets/icon.png'
import { PDFViewer,PDFDownloadLink } from '@react-pdf/renderer';


const GeneratePDF =  ({quantity,images}) => {
 
    const [submitted,setSubmitted] = useState(false)
    
    var CurrentPage = 1;
    var CurrentPageString=`Page ${CurrentPage}/${quantity}`
    
    const [MyPages,setMyPages] = useState([])

    if(!submitted){
        var testPages = [];  
        for(var i=0;i<quantity;i++){
            CurrentPageString=`Page ${CurrentPage}/${quantity}`
            testPages.push(
                <Page key={i} size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text>Scan me to save lives!!</Text>
                        <Image style={styles.image} source={images[i]} />
                        <Text>{CurrentPageString}</Text>
                    </View> 
                </Page>);
            
            CurrentPage++;
        }
        setMyPages(testPages);
        setSubmitted(true)
    }

    const MyDoc = () => <Document >{MyPages.map(page => page)}</Document>

    
    return(
        <PDFDownloadLink document={<MyDoc />} fileName="SaveLives.pdf">
            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
        </PDFDownloadLink>
        
    );
   
};

const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      width:'100%',
      textAlign:"center"
    },
    image: {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      width:"50%",
      padding: 10,
      backgroundColor: 'red',
      objectFit: 'cover',
    },
    section: {
      width: '100%',
      height: '100%',
      flexGrow: 1
    },
    QR:{
        height:500,
        scale:0.5
    },
    footer: {
        height: 100
    }
});

ReactDOM.render(<GeneratePDF />, document.getElementById('root'));
export default GeneratePDF;