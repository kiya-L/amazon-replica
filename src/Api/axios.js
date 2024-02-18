import axios from "axios"
const axiosInstance = axios.create({
  //baseURL: "http://localhost:5001",
  baseURL: "https://amazon-api-deploy-3zug.onrender.com/",
});

export { axiosInstance };