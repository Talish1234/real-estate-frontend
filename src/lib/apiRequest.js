import axios from "axios";

const apiRequest = axios.create({
    baseURL:"https://real-estae-backend.onrender.com/api",
    withCredentials:true});
export default apiRequest;