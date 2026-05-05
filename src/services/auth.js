

import axios from "axios";

const API = axios.create({
  // baseURL: "http://127.0.0.1:8000/api",
   baseURL:"https://resume-project-b.onrender.com/api",
});

export const googleLogin = (token) => {
  return API.post("/google-auth/", {
    token: token,
  });
};