import http from "http-common";

const createDoctor = (data) => {
  return http.post("/registerDoctor", data).then((resp) => resp.data);
};

const createEstablishment = (data) => {
  return http.post("/registerEstablishment", data).then((resp) => resp.data);
};

const authenticateUser = (data) => {
  return http.post("/login", data).then((resp) => resp.data);
};

export default {
  authenticateUser,
  createDoctor,
  createEstablishment,
};
