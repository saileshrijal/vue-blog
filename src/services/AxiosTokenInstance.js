import axios from "axios";
import authService from "@/services/AuthService";
import router from "@/router";

const axiosTokenInstance = axios.create({
    baseURL: "http://localhost:5008/api",
});


axiosTokenInstance.interceptors.request.use((config)=>{
    const token = authService.getToken();
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosTokenInstance.interceptors.response.use((response)=>{
    return response;
}, (error)=>{
    if(error.response.status === 401){
        authService.logout();
        router.push("/login");
    }
});

export default axiosTokenInstance;