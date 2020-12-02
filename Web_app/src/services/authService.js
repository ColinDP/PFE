import http from "../http-common";

const createUser = (data) => {
  return http.post("/register", data).then((resp) => resp.data);
};

const authenticateUser = (data) => {
  return http.post("/login", data).then((resp) => resp.data);
};

export default {
  authenticateUser,
  createUser,
};
