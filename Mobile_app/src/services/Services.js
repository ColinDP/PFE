import http from "../http-common";

const sendMobileScan = (data) => {
  return http.post("/sendMobileScan", data).then((resp) => resp.data);
};

const getInfo = (data) => {
  return http.post("/contactServer", data).then((resp) => resp.data);
};

//for test
const getDeviceId = () => {
  return http.get(`/get_device_id`);
};

export default {
    sendMobileScan,
    getInfo,
    getDeviceId
};