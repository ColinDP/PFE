import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.1.14:8080/api",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded", 
    Accept: "application/json"
  }
});
