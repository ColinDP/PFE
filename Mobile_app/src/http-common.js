import axios from "axios";
import Constants from "expo-constants";

const { manifest } = Constants;
const uri = `http://${manifest.debuggerHost.split(":").shift()}:8080/api`;
//const uri = `https://pfeapi.herokuapp.com/api`;

console.log("url : " + uri);

export default axios.create({
  baseURL: uri,
  headers: {
    "Content-type": "application/x-www-form-urlencoded",
    Accept: "application/json",
  },
});
