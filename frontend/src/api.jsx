import axios from "axios";

const api = axios.create({
  baseURL: "https://assignment-gv11.onrender.com",
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;