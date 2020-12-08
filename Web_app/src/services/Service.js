import http from "http-common";

const askForQR = (payload) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const data = { ...payload, ...user };
  return http.post("/get_code", data);
};

const listQR = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const data = { ...user };
  return http.post("/get_list", data);
}

export default {
  askForQR,
  listQR
};
