// // import { GoogleLogin } from "@react-oauth/google";
// // import { googleLogin } from "../api/auth";

// // const GoogleSignIn = () => {
// //   const handleSuccess = async (response) => {
// //     try {
// //       console.log("Google Response:", response);

// //       const res = await googleLogin(response.credential);

// //       console.log("Backend Response:", res.data);

// //       //  Save tokens
// //       localStorage.setItem("access", res.data.access);
// //       localStorage.setItem("refresh", res.data.refresh);

// //       alert("Login Success 🚀");

// //     } catch (error) {
// //       console.error(error);
// //       alert("Login Failed ❌");
// //     }
// //   };

// //   return (
// //     <GoogleLogin
// //       onSuccess={handleSuccess}
// //       onError={() => console.log("Google Login Failed")}
// //     />
// //   );
// // };

// // export default GoogleSignIn;



// import { GoogleLogin } from "@react-oauth/google";
// import { googleLogin } from "../services/auth";

// const GoogleSignIn = () => {
//   const handleSuccess = async (response) => {
//     try {
//       const res = await googleLogin(response.credential);

//       localStorage.setItem("access_token", res.data.access);
//       localStorage.setItem("refresh_token", res.data.refresh);

//       alert("Login Success 🚀");

//       window.location.href = "/dashboard";
//     } catch (error) {
//       console.error(error);
//       alert("Login Failed ❌");
//     }
//   };

//   return (
//     <GoogleLogin
//       onSuccess={handleSuccess}
//       onError={() => console.log("Google Login Failed")}
//     />
//   );
// };

// export default GoogleSignIn;






import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "@/services/auth";

const GoogleSignIn = () => {
  const handleSuccess = async (response) => {
    try {
      const res = await googleLogin(response.credential);

      // 
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);

      localStorage.setItem("user", JSON.stringify({
        username: res.data.username,
        email: res.data.email
      }));

      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
      alert("Login Failed ❌");
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