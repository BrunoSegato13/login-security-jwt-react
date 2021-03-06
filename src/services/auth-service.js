import axios from "axios";

const API_URL = 'http://localhost:8080/api/auth/';

const register = (username, email, password) => {
    
    return axios.post(API_URL + "singup",{
        username,
        email,
        password,
    });
};

const login = (username, password) => {
    
    return axios.post(API_URL + "signin", {
        username,
        password
    })
    .then((response) => {
        if(response.data.token){
            localStorage.setItem("user", JSON.stringify(response.data))
        }
        console.log(response.data);
        return response.data;
    });
};

const loguot = () =>{
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    register,
    login,
    loguot,
    getCurrentUser
};