


// import { GoogleLogin } from "@react-oauth/google";
// import { googleLogin } from "@/services/auth";

// const GoogleSignIn = () => {
//   const handleSuccess = async (response) => {
//     try {
//       const res = await googleLogin(response.credential);

//       // 
//       localStorage.setItem("access_token", res.data.access);
//       localStorage.setItem("refresh_token", res.data.refresh);

//       localStorage.setItem("user", JSON.stringify({
//         username: res.data.username,
//         email: res.data.email
//       }));

//       window.location.href = "/dashboard";
//     } catch (error) {
//       console.error(error);
//       alert("Login Failed ");
//     }
//   };

//   return (
//     <div className="w-full flex justify-center">
//       <GoogleLogin
//         onSuccess={handleSuccess}
//         onError={() => console.log("Google Login Failed")}
//       />
//     </div>
//   );
// };

// export default GoogleSignIn;



import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "@/services/auth";
import { useNavigate } from "react-router-dom";   // ✅ ADD THIS

const GoogleSignIn = () => {
  const navigate = useNavigate();   // ✅ ADD THIS

  const handleSuccess = async (response) => {
    try {
      const res = await googleLogin(response.credential);

      // ✅ Keep your existing storage logic
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);

      localStorage.setItem("user", JSON.stringify({
        username: res.data.username,
        email: res.data.email
      }));

      // ✅ NEW: use client-side navigation (no reload)
      navigate("/dashboard");

      // ✅ OPTIONAL fallback (only if something breaks)
      // setTimeout(() => {
      //   window.location.href = "/dashboard";
      // }, 100);

    } catch (error) {
      console.error(error);
      alert("Login Failed ");
    }
  };

  return (
    <div className="w-full flex justify-center">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Google Login Failed")}
      />
    </div>
  );
};

export default GoogleSignIn;