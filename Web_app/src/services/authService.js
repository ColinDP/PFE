import http from "http-common";

const createDoctor = (data) => {
  return http.post("/register_doctor", data).then((resp) => resp.data);
};

const createEstablishment = (data) => {
  return http.post("/register_establishment", data).then((resp) => resp.data);
};

const authenticateUser = (data) => {
  return http.post("/login", data).then((resp) => resp.data);
};

const logout = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const data = { token: user.token };
  return http.post("/logout", data).then((resp) => resp.data);
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  authenticateUser,
  createDoctor,
  createEstablishment,
  logout,
  getCurrentUser,
};
