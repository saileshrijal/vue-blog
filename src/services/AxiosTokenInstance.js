import axios from "axios";
import { getToken, logout } from "./TokenService";
import router from "@/router";

const axiosTokenInstance = axios.create();

axiosTokenInstance.interceptors.request.use((config)=>{
    const token = getToken();
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosTokenInstance.interceptors.response.use((response)=>{
    return response;
}, (error)=>{
    if(error.response.status === 401){
        logout();
        router.push("/login");
    }
});

export default axiosTokenInstance;