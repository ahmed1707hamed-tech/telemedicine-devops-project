import axios from "axios";

const API = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json"
  }
});

export const registerUser = (data) => {
  return API.post("/register", data);
};

export const getAppointments = () => API.get("/appointments");
export const createAppointment = (data) => API.post("/appointment", data);

export default API;
