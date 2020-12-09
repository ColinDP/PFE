import axios from "axios";

export default axios.create({
  baseURL: "https://pfeapi.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
  },
});
