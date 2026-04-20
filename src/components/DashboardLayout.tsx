


// import { ReactNode, useState, useRef, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "@/contexts/AuthContext";
// import {
//   LayoutDashboard,
//   Building2,
//   Upload,
//   LogOut,
//   Menu,
//   FileText,
//   History,
// } from "lucide-react";
// import { LayoutTemplate } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const baseNavItems = [
//   { label: "Upload Resume", path: "/upload", icon: Upload },
//   { label: "My Upload History", path: "/history", icon: History },
//   { label: "Resume Templates", path: "/templates", icon: LayoutTemplate },
//   { label: "Profile", path: "/profile", icon: FileText },
// ];

// const adminNavItems = [
//   { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
//   { label: "Departments", path: "/departments", icon: Building2 },
//   { label: "Upload Resume", path: "/upload", icon: Upload },
//   { label: "All Resumes", path: "/resumes", icon: FileText },
// ];

// const DashboardLayout = ({ children }: { children: ReactNode }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { logout, user, isAdmin } = useAuth();
//   const navItems = isAdmin ? adminNavItems : baseNavItems;

//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // Dropdown
//   const [open, setOpen] = useState(false);
//   const profileRef = useRef<HTMLDivElement>(null);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const isActive = (path: string) => location.pathname === path;

//   useEffect(() => {
//     const handleClickOutside = (event: any) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () =>
//       document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const SidebarContent = () => (
//     <div className="flex flex-col h-full">
//       {/* LOGO */}
//       <div className="p-6 border-b border-sidebar-border">
//         <Link to="/dashboard" className="flex items-center gap-3">
//           <div className="w-9 h-9 rounded-xl bg-sidebar-primary flex items-center justify-center">
//             <FileText className="w-5 h-5 text-sidebar-primary-foreground" />
//           </div>
//           <span className="text-lg font-bold font-heading text-sidebar-primary-foreground">
//             ResumeHub
//           </span>
//         </Link>
//       </div>

//       {/* NAV */}
//       <nav className="flex-1 p-4 space-y-1">
//         {navItems.map((item) => (
//           <Link
//             key={item.path}
//             to={item.path}
//             onClick={() => setSidebarOpen(false)}
//             className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
//               isActive(item.path)
//                 ? "bg-sidebar-accent text-sidebar-primary"
//                 : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
//             }`}
//           >
//             <item.icon className="w-5 h-5" />
//             {item.label}
//           </Link>
//         ))}
//       </nav>
//     </div>
//   );

//   return (
//     <div className="min-h-screen flex bg-background">
//       {/* Sidebar Desktop */}
//       <aside className="hidden lg:flex w-64 bg-sidebar flex-col fixed inset-y-0 left-0 z-30">
//         <SidebarContent />
//       </aside>

//       {/* Sidebar Mobile */}
//       {sidebarOpen && (
//         <div className="fixed inset-0 z-40 lg:hidden">
//           <div
//             className="absolute inset-0 bg-foreground/40"
//             onClick={() => setSidebarOpen(false)}
//           />
//           <aside className="absolute left-0 top-0 bottom-0 w-64 bg-sidebar z-50">
//             <SidebarContent />
//           </aside>
//         </div>
//       )}

//       {/* MAIN */}
//       <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        
//         {/* HEADER */}
//         <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20">
          
//           {/* LEFT */}
//           <div className="flex items-center">
//             <Button
//               variant="ghost"
//               size="icon"
//               className="lg:hidden mr-3"
//               onClick={() => setSidebarOpen(true)}
//             >
//               <Menu className="w-5 h-5" />
//             </Button>

//             <h2 className="text-lg font-semibold">
//               {navItems.find((n) => isActive(n.path))?.label || "Dashboard"}
//             </h2>
//           </div>

//           {/*  IMPROVED PROFILE */}
//           {user && (
//             <div ref={profileRef} className="relative">
              
//               <div
//                 onClick={() => setOpen(!open)}
//                 className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-muted transition cursor-pointer"
//               >
//                 {/* Avatar */}
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-semibold shadow">
//                   {user.username?.[0]?.toUpperCase()}
//                 </div>

//                 {/* Info */}
//                 <div className="hidden sm:flex flex-col leading-tight">
//                   <span className="text-sm font-semibold">
//                     {user.username}
//                   </span>
//                   <span className="text-xs text-muted-foreground truncate max-w-[140px]">
//                     {user.email}
//                   </span>
//                 </div>

//                 {/* Arrow */}
//                 <svg
//                   className={`w-4 h-4 text-muted-foreground transition-transform ${
//                     open ? "rotate-180" : ""
//                   }`}
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M19 9l-7 7-7-7" />
//                 </svg>
//               </div>

//               {/* DROPDOWN */}
//               {open && (
//                 <div className="absolute right-0 mt-3 w-52 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden">
                  
               

//                   {/* Actions */}
//                   <button
//                     onClick={() => {
//                       setOpen(false);
//                       navigate("/profile");
//                     }}
//                     className="w-full text-left px-4 py-2 text-sm hover:bg-muted transition"
//                   >
//                     Profile
//                   </button>

//                   <button
//                     onClick={() => {
//                       setOpen(false);
//                       handleLogout();
//                     }}
//                     className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-muted transition"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </header>

//         {/* CONTENT */}
//         <main className="flex-1 p-4 lg:p-8">{children}</main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;



// import { ReactNode, useState, useRef, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useAuth } from "@/contexts/AuthContext";
// import {
//   LayoutDashboard,
//   Building2,
//   Upload,
//   Menu,
//   FileText,
//   History,
//   LogOut,
//   ChevronDown,
//   UserCircle2,
//   Sparkles,
//   PanelLeftClose,
// } from "lucide-react";
// import { LayoutTemplate } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const baseNavItems = [
//   { label: "Upload Resume", path: "/upload", icon: Upload },
//   { label: "My Upload History", path: "/history", icon: History },
//   { label: "Resume Templates", path: "/templates", icon: LayoutTemplate },
//   { label: "Profile", path: "/profile", icon: FileText },
// ];

// const adminNavItems = [
//   { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
//   { label: "Departments", path: "/departments", icon: Building2 },
//   { label: "Upload Resume", path: "/upload", icon: Upload },
//   { label: "All Resumes", path: "/resumes", icon: FileText },
// ];

// const DashboardLayout = ({ children }: { children: ReactNode }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { logout, user, isAdmin } = useAuth();
//   const navItems = isAdmin ? adminNavItems : baseNavItems;

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [open, setOpen] = useState(false);
//   const profileRef = useRef<HTMLDivElement>(null);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const isActive = (path: string) => location.pathname === path;

//   useEffect(() => {
//     const handleClickOutside = (event: any) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const currentPage =
//     navItems.find((n) => isActive(n.path))?.label || "Dashboard";

//   const SidebarContent = () => (
//     <div className="flex h-full flex-col bg-[#0f172a] text-white">
//       {/* LOGO */}
//       <div className="border-b border-white/10 px-6 py-6">
//         <Link to="/dashboard" className="flex items-center gap-3">
//           <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#16a34a] shadow-lg shadow-green-900/30">
//             <FileText className="h-5 w-5 text-white" />
//           </div>
//           <div>
//             <span className="block text-lg font-extrabold tracking-tight">
//               ResumePro
//             </span>
//             <span className="text-xs text-slate-400">
//               Resume Management
//             </span>
//           </div>
//         </Link>
//       </div>

//       {/* User badge */}
//       <div className="px-4 pt-5">
//         <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
//           <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
//             <Sparkles className="h-3.5 w-3.5" />
//             {isAdmin ? "Admin Access" : "User Access"}
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-sm font-bold text-white">
//               {user?.username?.[0]?.toUpperCase() || "U"}
//             </div>
//             <div className="min-w-0">
//               <p className="truncate text-sm font-semibold text-white">
//                 {user?.username || "User"}
//               </p>
//               <p className="truncate text-xs text-slate-400">
//                 {user?.email || "No email"}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* NAV */}
//       <nav className="flex-1 space-y-2 px-4 py-6">
//         {navItems.map((item) => (
//           <Link
//             key={item.path}
//             to={item.path}
//             onClick={() => setSidebarOpen(false)}
//             className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
//               isActive(item.path)
//                 ? "bg-gradient-to-r from-[#16a34a] to-[#15803d] text-white shadow-lg shadow-green-900/20"
//                 : "text-slate-300 hover:bg-white/5 hover:text-white"
//             }`}
//           >
//             <div
//               className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
//                 isActive(item.path)
//                   ? "bg-white/15 text-white"
//                   : "bg-white/5 text-slate-300 group-hover:bg-white/10 group-hover:text-white"
//               }`}
//             >
//               <item.icon className="h-4.5 w-4.5" />
//             </div>
//             <span>{item.label}</span>
//           </Link>
//         ))}
//       </nav>

//       {/* Bottom logout */}
//       <div className="border-t border-white/10 p-4">
//         <button
//           onClick={handleLogout}
//           className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-red-500/10 hover:text-red-400"
//         >
//           <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5">
//             <LogOut className="h-4.5 w-4.5" />
//           </div>
//           Logout
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#f4f8f5]">
//       {/* Sidebar Desktop */}
//       <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 overflow-hidden border-r border-slate-200/60 lg:flex">
//         <SidebarContent />
//       </aside>

//       {/* Sidebar Mobile */}
//       {sidebarOpen && (
//         <div className="fixed inset-0 z-40 lg:hidden">
//           <div
//             className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
//             onClick={() => setSidebarOpen(false)}
//           />
//           <aside className="absolute left-0 top-0 bottom-0 z-50 w-72 overflow-hidden shadow-2xl">
//             <SidebarContent />
//           </aside>
//         </div>
//       )}

//       {/* MAIN */}
//       <div className="flex min-h-screen flex-col lg:ml-72">
//         {/* HEADER */}
//         <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
//           <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
//             {/* LEFT */}
//             <div className="flex items-center gap-3">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="rounded-xl lg:hidden"
//                 onClick={() => setSidebarOpen(true)}
//               >
//                 <Menu className="h-5 w-5" />
//               </Button>

//               <div className="hidden lg:flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-600">
//                 <PanelLeftClose className="h-5 w-5" />
//               </div>

//               <div>
//                 <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
//                   Dashboard Panel
//                 </p>
//                 <h2 className="text-xl font-bold tracking-tight text-slate-900">
//                   {currentPage}
//                 </h2>
//               </div>
//             </div>

//             {/* RIGHT */}
//             {user && (
//               <div ref={profileRef} className="relative">
//                 <div
//                   onClick={() => setOpen(!open)}
//                   className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:shadow-md"
//                 >
//                   <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#16a34a] to-[#15803d] text-sm font-bold text-white shadow">
//                     {user.username?.[0]?.toUpperCase()}
//                   </div>

//                   <div className="hidden sm:flex flex-col leading-tight">
//                     <span className="max-w-[140px] truncate text-sm font-semibold text-slate-800">
//                       {user.username}
//                     </span>
//                     <span className="max-w-[160px] truncate text-xs text-slate-500">
//                       {user.email}
//                     </span>
//                   </div>

//                   <ChevronDown
//                     className={`h-4 w-4 text-slate-400 transition-transform ${
//                       open ? "rotate-180" : ""
//                     }`}
//                   />
//                 </div>

//                 {/* DROPDOWN */}
//                 {open && (
//                   <div className="absolute right-0 mt-3 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
//                     <div className="border-b border-slate-100 px-4 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700">
//                           <UserCircle2 className="h-5 w-5" />
//                         </div>
//                         <div className="min-w-0">
//                           <p className="truncate text-sm font-semibold text-slate-800">
//                             {user.username}
//                           </p>
//                           <p className="truncate text-xs text-slate-500">
//                             {user.email}
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     <button
//                       onClick={() => {
//                         setOpen(false);
//                         navigate("/profile");
//                       }}
//                       className="w-full px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
//                     >
//                       Profile
//                     </button>

//                     <button
//                       onClick={() => {
//                         setOpen(false);
//                         handleLogout();
//                       }}
//                       className="w-full px-4 py-3 text-left text-sm font-medium text-red-500 transition hover:bg-red-50"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </header>

//         {/* PAGE CONTENT */}
//         <main className="flex-1 p-4 sm:p-6 lg:p-8">
//           <div className="mx-auto max-w-7xl">{children}</div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;



import { ReactNode, useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Building2,
  Upload,
  LogOut,
  Menu,
  FileText,
  History,
  Sparkles,
  PanelLeftClose,
} from "lucide-react";
import { LayoutTemplate } from "lucide-react";
import { Button } from "@/components/ui/button";

const baseNavItems = [
  { label: "Upload Resume", path: "/upload", icon: Upload },
  { label: "My Upload History", path: "/history", icon: History },
  { label: "Resume Templates", path: "/templates", icon: LayoutTemplate },
  { label: "Profile", path: "/profile", icon: FileText },
];

const adminNavItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Departments", path: "/departments", icon: Building2 },
  { label: "Upload Resume", path: "/upload", icon: Upload },
  { label: "All Resumes", path: "/resumes", icon: FileText },
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user, isAdmin } = useAuth();
  const navItems = isAdmin ? adminNavItems : baseNavItems;

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  const currentPage =
    navItems.find((n) => isActive(n.path))?.label || "Dashboard";

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-[#0f172a] text-white">
      {/* LOGO */}
      <div className="border-b border-white/10 px-6 py-6">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#16a34a] shadow-lg shadow-green-900/30">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="block text-lg font-extrabold tracking-tight">
              ResumePro
            </span>
            <span className="text-xs text-slate-400">
              Resume Management
            </span>
          </div>
        </Link>
      </div>

      {/* LEFT PROFILE CARD */}
      <div className="px-4 pt-5">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
            <Sparkles className="h-3.5 w-3.5" />
            {isAdmin ? "Admin Access" : "User Access"}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-sm font-bold text-white">
              {user?.username?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {user?.username || "User"}
              </p>
              <p className="truncate text-xs text-slate-400">
                {user?.email || "No email"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* NAV */}
      <nav className="flex-1 space-y-2 px-4 py-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setSidebarOpen(false)}
            className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
              isActive(item.path)
                ? "bg-gradient-to-r from-[#16a34a] to-[#15803d] text-white shadow-lg shadow-green-900/20"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
                isActive(item.path)
                  ? "bg-white/15 text-white"
                  : "bg-white/5 text-slate-300 group-hover:bg-white/10 group-hover:text-white"
              }`}
            >
              <item.icon className="h-4.5 w-4.5" />
            </div>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* LEFT LOGOUT */}
      <div className="border-t border-white/10 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5">
            <LogOut className="h-4.5 w-4.5" />
          </div>
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f4f8f5]">
      {/* Sidebar Desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 overflow-hidden border-r border-slate-200/60 lg:flex">
        <SidebarContent />
      </aside>

      {/* Sidebar Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 z-50 w-72 overflow-hidden shadow-2xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* MAIN */}
      <div className="flex min-h-screen flex-col lg:ml-72">
        {/* HEADER */}
        <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
          <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>

              <div className="hidden lg:flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                <PanelLeftClose className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                  Dashboard Panel
                </p>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                  {currentPage}
                </h2>
              </div>
            </div>

            {/* RIGHT SIDE REMOVED */}
            <div />
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;