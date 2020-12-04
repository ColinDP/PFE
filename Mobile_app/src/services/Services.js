import http from "../http-common";

const sendMobileScan = (data) => {
  return http.post("/sendMobileScan", data).then((resp) => resp.data);
};

const getInfo = (data) => {
  return http.post("/contactServer", data).then((resp) => resp.data);
};

export default {
    sendMobileScan,
    getInfo
};