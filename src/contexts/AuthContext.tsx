



// import { createContext, useContext, useEffect, useState, ReactNode } from "react";
// import API from "@/services/api";

// interface UserType {
//   username: string;
//   email: string;
//   isAdmin: boolean;
// }

// interface AuthContextType {
//   isAuthenticated: boolean;
//   user: UserType | null;
//   isAdmin: boolean;
//   login: (username: string, password: string) => Promise<void>;
//   signup: (username: string, email: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used within AuthProvider");
//   return ctx;
// };




// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [user, setUser] = useState<UserType | null>(null);

//   useEffect(() => {
//     const accessToken = localStorage.getItem("access_token");
//     const savedUser = localStorage.getItem("user");

//     if (accessToken && savedUser) {
//       const parsed = JSON.parse(savedUser);
//       setIsAuthenticated(true);
//       setIsAdmin(parsed?.isAdmin ?? false);
//       setUser(parsed);
//     }
//   }, []);

//   const login = async (username: string, password: string) => {
//   const response = await API.post("login/", {
//     username,
//     password,
//   });

//   const access = response.data.access;
//   const refresh = response.data.refresh;

//   if (!access || !refresh) {
//     throw new Error("Authentication failed");
//   }

//   localStorage.setItem("access_token", access);
//   localStorage.setItem("refresh_token", refresh);

//   const userData = {
//     username: response.data.username || username,
//     email: response.data.email || `${username}@example.com`,
//     isAdmin: response.data.is_admin ?? false,
//   };

//   localStorage.setItem("user", JSON.stringify(userData));

//   setIsAuthenticated(true);
//   setIsAdmin(userData.isAdmin);
//   setUser(userData);

//   return response.data; //  IMPORTANT FIX
// };

//   const signup = async (username: string, email: string, password: string) => {
//     await API.post("signup/", {
//       username,
//       email,
//       password,
//     });

//     await login(username, password);
//   };

//   const logout = () => {
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     localStorage.removeItem("user");

//     setIsAuthenticated(false);
//     setIsAdmin(false);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         isAuthenticated,
//         user,
//         isAdmin,
//         login,
//         signup,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };




import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import API from "@/services/api";

// 🔹 Response type from backend
interface LoginResponse {
  access: string;
  refresh: string;
  is_admin: boolean;
  username?: string;
  email?: string;
}

// 🔹 User type
interface UserType {
  username: string;
  email: string;
  isAdmin: boolean;
}

// 🔹 Context type
interface AuthContextType {
  isAuthenticated: boolean;
  user: UserType | null;
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<LoginResponse>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// 🔹 Create context
const AuthContext = createContext<AuthContextType | null>(null);

// 🔹 Hook
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

// 🔹 Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  // ✅ Restore session
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const savedUser = localStorage.getItem("user");

    if (accessToken && savedUser) {
      const parsed = JSON.parse(savedUser);
      setIsAuthenticated(true);
      setIsAdmin(parsed?.isAdmin ?? false);
      setUser(parsed);
    }
  }, []);

  // ✅ LOGIN
  const login = async (username: string, password: string): Promise<LoginResponse> => {
    const response = await API.post("login/", {
      username,
      password,
    });

    const data: LoginResponse = response.data;

    if (!data.access || !data.refresh) {
      throw new Error("Authentication failed");
    }

    // 🔐 Store tokens
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);

    // 👤 Store user
    const userData: UserType = {
      username: data.username || username,
      email: data.email || `${username}@example.com`,
      isAdmin: data.is_admin ?? false,
    };

    localStorage.setItem("user", JSON.stringify(userData));

    setIsAuthenticated(true);
    setIsAdmin(userData.isAdmin);
    setUser(userData);

    return data; // 🔥 IMPORTANT
  };

  // ✅ SIGNUP
  const signup = async (username: string, email: string, password: string) => {
    await API.post("signup/", {
      username,
      email,
      password,
    });

    // optional: auto login
    // await login(username, password);
  };

  // ✅ LOGOUT
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");

    setIsAuthenticated(false);
    setIsAdmin(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isAdmin,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};