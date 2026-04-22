// import { createContext, useContext } from "react";
// import axios from "axios";

// const API = axios.create({
//   // baseURL: "http://127.0.0.1:8000/api/",
//   baseURL:"https://resume-project-b.onrender.com/api/",
  
// });

// // 🔐 Attach token automatically
// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }
//   return req;
// });

// const AuthContext = createContext<any>(null);

// export const AuthProvider = ({ children }: any) => {

//   // ✅ SIGNUP
//   const signup = async (username: string, email: string, password: string) => {
//     const res = await API.post("register/", {
//       username,
//       email,
//       password,
//     });

//     return res.data; // VERY IMPORTANT
//   };

//   // ✅ LOGIN
//   const login = async (username: string, password: string) => {
//     const res = await API.post("login/", {
//       username,
//       password,
//     });

//     // store token
//     localStorage.setItem("token", res.data.access);
//     localStorage.setItem("is_admin", res.data.is_admin);

//     return res.data;
//   };

//   // ✅ LOGOUT
//   const logout = () => {
//     localStorage.clear();
//   };

//   return (
//     <AuthContext.Provider value={{ signup, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // ✅ Hook
// export const useAuth = () => useContext(AuthContext);






import { createContext, useContext } from "react";
import axios, { AxiosRequestHeaders } from "axios";

// 🔗 Backend API
const API = axios.create({
  baseURL: "https://resume-project-b.onrender.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Attach JWT token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers = (req.headers || {}) as AxiosRequestHeaders;
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// 🧠 Context
const AuthContext = createContext<any>(null);

// 🚀 Provider
export const AuthProvider = ({ children }: any) => {

  // ✅ SIGNUP
  const signup = async (username: string, email: string, password: string) => {
    try {
      const res = await API.post("signup/", {
        username,
        email,
        password,
      });
      return res.data;
    } catch (err: any) {
      throw err.response?.data || err.message;
    }
  };

  // ✅ LOGIN
  const login = async (username: string, password: string) => {
    try {
      const res = await API.post("login/", {
        username,
        password,
      });

      // 🔐 Store token
      localStorage.setItem("token", res.data.access);
      localStorage.setItem("is_admin", res.data.is_admin);

      return res.data;
    } catch (err: any) {
      throw err.response?.data || err.message;
    }
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("is_admin");
  };

  // ✅ GET PROFILE (optional)
  const getProfile = async () => {
    try {
      const res = await API.get("profile/");
      return res.data;
    } catch (err: any) {
      throw err.response?.data || err.message;
    }
  };

  return (
    <AuthContext.Provider value={{ signup, login, logout, getProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook
export const useAuth = () => useContext(AuthContext);