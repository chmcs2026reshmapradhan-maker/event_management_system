import axios from "axios";
const api = axios.create({
    baseURL :  "https://backend-8up4.onrender.com",
});
export default api;
