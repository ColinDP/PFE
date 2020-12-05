import http from "http-common";

const askForQR = (payload) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const data = { ...payload, ...user };
  return http.post("/get_code", data);
};

export default {
  askForQR,
};
