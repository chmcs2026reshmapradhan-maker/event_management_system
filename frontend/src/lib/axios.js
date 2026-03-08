import axios from "axios";
const api = axios.create({
    baseURL :  "https://backend-rw2f.onrender.com",
});
export default api;
