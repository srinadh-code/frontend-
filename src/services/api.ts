



// import axios, { AxiosRequestHeaders } from "axios";

// // ✅ Create API instance
// const API = axios.create({
//   baseURL: "https://resume-project-b.onrender.com/api/",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // 🔐 Attach JWT token (ONLY for protected APIs)
// API.interceptors.request.use((config) => {
//   const token =
//     localStorage.getItem("access_token") ||
//     localStorage.getItem("token") ||
//     localStorage.getItem("access");

//   // 🚨 IMPORTANT FIX
//   if (
//     token &&
//     !config.url?.includes("signup") &&
//     !config.url?.includes("login")
//   ) {
//     config.headers = (config.headers || {}) as AxiosRequestHeaders;
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default API;




import axios, { AxiosRequestHeaders } from "axios";

//  Create API instance
const API = axios.create({
  baseURL: "https://resume-project-b.onrender.com/api/",
  //  REMOVE Content-Type
});

// 🔐 Attach JWT token
API.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("access_token") ||
    localStorage.getItem("token") ||
    localStorage.getItem("access");

  if (
    token &&
    !config.url?.includes("signup") &&
    !config.url?.includes("login")
  ) {
    config.headers = (config.headers || {}) as AxiosRequestHeaders;
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;