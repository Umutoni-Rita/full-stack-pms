import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:5000/api/auth',
});

export const loginUser = (credentials) => API.post('/login', credentials);
export const registerUser = (credentials) => API.post('/register', credentials);
export const verifyOTP = (data) => API.post('/verify-otp', data);