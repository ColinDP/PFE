import http from "../http-common";

const authenticate = (data) => {
  return http.post("/login", data);
};

export default {
  authenticate,
};
