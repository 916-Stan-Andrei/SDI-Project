import axios from "axios";

export const api = axios.create({
    baseURL:"https://amusing-grace-production.up.railway.app",
    // baseURL:"http://localhost:8080",
}
)

export default api;