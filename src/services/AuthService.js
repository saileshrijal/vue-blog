import router from "@/router";

const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const getToken = () => {
    return localStorage.getItem("token");
};

const isAuthenticated = () => {
    return getToken() !== null && getUser() !== null;
};

const getRole = () => {
    return getUser().role;
};

const isAdmin = () => {
    return getRole() === "Admin";
};

const isUser = () => {
    return getRole() === "User";
};

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
};

export default {
    getUser,
    getToken,
    isAuthenticated,
    getRole,
    isAdmin,
    isUser,
    logout
};