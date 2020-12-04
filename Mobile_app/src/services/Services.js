import http from "../http-common";

const sendMobileScan = (data) => {
  return http.post("/sendMobileScan", data).then((resp) => resp.data);
};

export default {
    sendMobileScan,
};