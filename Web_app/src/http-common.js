import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:8080/api",
  baseURL: "http://192.168.1.14:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});
