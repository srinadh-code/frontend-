
// import { useEffect, useState } from "react";
// import API from "@/services/api";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { useToast } from "@/hooks/use-toast";
// import {
//   User,
//   Mail,
//   Calendar,
//   Sparkles,
//   ShieldCheck,
//   PencilLine,
// } from "lucide-react";

// interface UserProfile {
//   id: number;
//   username: string;
//   email: string;
//   first_name: string;
//   last_name: string;
//   date_joined: string;
// }

// const Profile = () => {
//   const [profile, setProfile] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//   });

//   const { toast } = useToast();

//   useEffect(() => {
//     const loadProfile = async () => {
//       try {
//         const { data } = await API.get("profile/");
//         setProfile(data);
//         setFormData({
//           first_name: data.first_name || "",
//           last_name: data.last_name || "",
//           email: data.email || "",
//         });
//       } catch (error) {
//         console.error("Failed to load profile", error);
//         toast({ title: "Error", description: "Unable to load profile" });
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProfile();
//   }, [toast]);

//   const handleUpdate = async () => {
//     try {
//       const { data } = await API.put("profile/", formData);
//       setProfile(data.data);
//       setEditing(false);
//       toast({
//         title: "Success",
//         description: "Profile updated successfully",
//       });
//     } catch (error) {
//       toast({ title: "Error", description: "Failed to update profile" });
//     }
//   };

//   if (loading) {
//     return (
//       <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
//         <p className="text-base text-slate-500">Loading profile...</p>
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="rounded-[2rem] border border-red-200 bg-red-50 p-10 text-center shadow-sm">
//         <p className="text-base text-red-500">Unable to load profile</p>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-5xl space-y-8">
//       {/* Top Header */}
//       <div className="rounded-[2rem] border border-green-100 bg-gradient-to-r from-[#eaf8ee] via-[#f4fbf6] to-white p-6 shadow-sm sm:p-8">
//         <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-green-700 shadow-sm">
//           <Sparkles className="h-4 w-4" />
//           Account Overview
//         </div>

//         <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//           <div>
//             <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
//               Your Profile
//             </h1>
//             <p className="mt-2 text-sm text-slate-600 sm:text-base">
//               View and manage your account information in one place.
//             </p>
//           </div>

//           <div className="rounded-2xl bg-white px-5 py-4 shadow-sm">
//             <p className="text-xs uppercase tracking-wide text-slate-500">
//               Member Since
//             </p>
//             <h2 className="mt-1 text-xl font-bold text-slate-900">
//               {new Date(profile.date_joined).toLocaleDateString()}
//             </h2>
//           </div>
//         </div>
//       </div>

//       {/* Main Profile Card */}
//       <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
//         {/* Header section */}
//         <div className="flex flex-col gap-5 border-b border-slate-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
//           <div className="flex items-center gap-4">
//             <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-700">
//               <User className="h-10 w-10" />
//             </div>

//             <div>
//               <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
//                 {profile.first_name || profile.username}
//               </h2>
//               <p className="mt-1 text-sm text-slate-500">{profile.email}</p>

//               <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700">
//                 <ShieldCheck className="h-4 w-4" />
//                 Account Active
//               </div>
//             </div>
//           </div>

//           <Button
//             variant={editing ? "outline" : "default"}
//             onClick={() => setEditing(!editing)}
//             className={
//               editing
//                 ? "rounded-xl"
//                 : "rounded-xl bg-[#16a34a] hover:bg-[#15803d]"
//             }
//           >
//             <PencilLine className="mr-2 h-4 w-4" />
//             {editing ? "Cancel" : "Edit Profile"}
//           </Button>
//         </div>

//         {/* View mode */}
//         {!editing ? (
//           <div className="mt-8 space-y-6">
//             <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
//               <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
//                 <Label className="text-sm font-medium text-slate-500">
//                   Username
//                 </Label>
//                 <p className="mt-2 text-lg font-semibold text-slate-900">
//                   {profile.username}
//                 </p>
//               </div>

//               <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
//                 <Label className="text-sm font-medium text-slate-500">
//                   First Name
//                 </Label>
//                 <p className="mt-2 text-lg font-semibold text-slate-900">
//                   {profile.first_name || "Not set"}
//                 </p>
//               </div>

//               <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
//                 <Label className="text-sm font-medium text-slate-500">
//                   Last Name
//                 </Label>
//                 <p className="mt-2 text-lg font-semibold text-slate-900">
//                   {profile.last_name || "Not set"}
//                 </p>
//               </div>

//               <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
//                 <Label className="flex items-center gap-2 text-sm font-medium text-slate-500">
//                   <Mail className="h-4 w-4" />
//                   Email
//                 </Label>
//                 <p className="mt-2 text-lg font-semibold text-slate-900">
//                   {profile.email}
//                 </p>
//               </div>
//             </div>

//             <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
//               <Label className="flex items-center gap-2 text-sm font-medium text-slate-500">
//                 <Calendar className="h-4 w-4" />
//                 Member Since
//               </Label>
//               <p className="mt-2 text-lg font-semibold text-slate-900">
//                 {new Date(profile.date_joined).toLocaleDateString()}
//               </p>
//             </div>
//           </div>
//         ) : (
//           /* Edit mode */
//           <div className="mt-8 space-y-6">
//             <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
//               <div className="space-y-2.5">
//                 <Label htmlFor="first_name" className="text-sm font-semibold text-slate-800">
//                   First Name
//                 </Label>
//                 <Input
//                   id="first_name"
//                   value={formData.first_name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, first_name: e.target.value })
//                   }
//                   placeholder="Enter first name"
//                   className="h-12 rounded-xl border-slate-200"
//                 />
//               </div>

//               <div className="space-y-2.5">
//                 <Label htmlFor="last_name" className="text-sm font-semibold text-slate-800">
//                   Last Name
//                 </Label>
//                 <Input
//                   id="last_name"
//                   value={formData.last_name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, last_name: e.target.value })
//                   }
//                   placeholder="Enter last name"
//                   className="h-12 rounded-xl border-slate-200"
//                 />
//               </div>
//             </div>

//             <div className="space-y-2.5">
//               <Label htmlFor="email" className="text-sm font-semibold text-slate-800">
//                 Email
//               </Label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) =>
//                   setFormData({ ...formData, email: e.target.value })
//                 }
//                 placeholder="Enter email"
//                 className="h-12 rounded-xl border-slate-200"
//               />
//             </div>

//             <div className="flex flex-wrap gap-3 pt-2">
//               <Button
//                 className="rounded-xl bg-[#16a34a] px-6 hover:bg-[#15803d]"
//                 onClick={handleUpdate}
//               >
//                 Save Changes
//               </Button>

//               <Button
//                 variant="outline"
//                 className="rounded-xl"
//                 onClick={() => setEditing(false)}
//               >
//                 Cancel
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;

import { useEffect, useState } from "react";
import API from "@/services/api";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  User,
  Mail,
  Calendar,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

interface UserProfile {
  id: number;
  username: string;
  email: string;
  date_joined: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const { toast } = useToast();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await API.get("profile/");
        setProfile(data);
      } catch (error) {
        console.error("Failed to load profile", error);
        toast({
          title: "Error",
          description: "Unable to load profile",
        });
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [toast]);

  if (loading) {
    return (
      <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
        <p className="text-base text-slate-500">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="rounded-[2rem] border border-red-200 bg-red-50 p-10 text-center shadow-sm">
        <p className="text-base text-red-500">Unable to load profile</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">

      {/* HEADER */}
      <div className="rounded-[2rem] border border-green-100 bg-gradient-to-r from-[#eaf8ee] via-[#f4fbf6] to-white p-6 shadow-sm sm:p-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-green-700 shadow-sm">
          <Sparkles className="h-4 w-4" />
          Account Overview
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Your Profile
            </h1>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              View your account information.
            </p>
          </div>

          <div className="rounded-2xl bg-white px-5 py-4 shadow-sm">
            <p className="text-xs uppercase text-slate-500">
              Member Since
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-900">
              {profile.date_joined || "N/A"}   {/* ✅ FIXED */}
            </h2>
          </div>
        </div>
      </div>

      {/* PROFILE CARD */}
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

        {/* USER HEADER */}
        <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-700">
            <User className="h-10 w-10" />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              {profile.username || "User"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {profile.email || "N/A"}
            </p>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700">
              <ShieldCheck className="h-4 w-4" />
              Account Active
            </div>
          </div>
        </div>

        {/* DETAILS */}
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* Username */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <Label className="text-sm text-slate-500">
                Username
              </Label>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {profile.username || "N/A"}
              </p>
            </div>

            {/* Email */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <Label className="flex items-center gap-2 text-sm text-slate-500">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {profile.email || "N/A"}
              </p>
            </div>
          </div>

          {/* Member Since */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
            <Label className="flex items-center gap-2 text-sm text-slate-500">
              <Calendar className="h-4 w-4" />
              Member Since
            </Label>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {profile.date_joined || "N/A"}   {/* ✅ FIXED */}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;