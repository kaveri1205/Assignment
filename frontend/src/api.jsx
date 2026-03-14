import axios from "axios";

const API_BASE_URL = "https://assignment-oiak.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;