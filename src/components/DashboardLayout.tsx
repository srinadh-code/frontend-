



import { ReactNode, useState } from "react";
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
      {/* Logo */}
      <div className="border-b border-white/10 px-6 py-6">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#16a34a] shadow-lg">
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

      {/* Clickable Profile Card */}
      <div className="px-4 pt-5">
        <div
          onClick={() => navigate("/profile")}
          className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
        >
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

      {/* Nav */}
      <nav className="flex-1 space-y-2 px-4 py-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setSidebarOpen(false)}
            className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
              isActive(item.path)
                ? "bg-gradient-to-r from-[#16a34a] to-[#15803d] text-white shadow-lg"
                : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                isActive(item.path)
                  ? "bg-white/10"
                  : "bg-white/5 group-hover:bg-white/10"
              }`}
            >
              <item.icon className="h-4.5 w-4.5" />
            </div>

            {item.label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
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
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-slate-200/60 lg:flex">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/50"
            onClick={() => setSidebarOpen(false)}
          />

          <aside className="absolute left-0 top-0 bottom-0 z-50 w-72 shadow-2xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex min-h-screen flex-col lg:ml-72">
        {/* Header */}
        <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/90 backdrop-blur">
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
                <h2 className="text-xl font-bold text-slate-900">
                  {currentPage}
                </h2>
              </div>
            </div>

            <div />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;



// import { ReactNode, useState } from "react";
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

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const isActive = (path: string) => location.pathname === path;

//   const currentPage =
//     navItems.find((n) => isActive(n.path))?.label || "Dashboard";

//   const SidebarContent = () => (
//     <div className="flex h-full flex-col bg-[#0f172a] text-white">
//       {/* Logo */}
//       <div className="border-b border-white/10 px-6 py-6">
//         <Link to="/dashboard" className="flex items-center gap-3">
//           <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#16a34a] shadow-lg">
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

//       {/* Profile card only for Admin */}
//       {isAdmin && (
//         <div className="px-4 pt-5">
//           <div
//             onClick={() => navigate("/profile")}
//             className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
//           >
//             <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
//               <Sparkles className="h-3.5 w-3.5" />
//               Admin Access
//             </div>

//             <div className="flex items-center gap-3">
//               <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-sm font-bold text-white">
//                 {user?.username?.[0]?.toUpperCase() || "U"}
//               </div>

//               <div className="min-w-0">
//                 <p className="truncate text-sm font-semibold text-white">
//                   {user?.username || "User"}
//                 </p>
//                 <p className="truncate text-xs text-slate-400">
//                   {user?.email || "No email"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Nav */}
//       <nav className="flex-1 space-y-2 px-4 py-6">
//         {navItems.map((item) => (
//           <Link
//             key={item.path}
//             to={item.path}
//             onClick={() => setSidebarOpen(false)}
//             className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
//               isActive(item.path)
//                 ? "bg-gradient-to-r from-[#16a34a] to-[#15803d] text-white shadow-lg"
//                 : "text-slate-300 hover:bg-white/5 hover:text-white"
//             }`}
//           >
//             <div
//               className={`flex h-9 w-9 items-center justify-center rounded-xl ${
//                 isActive(item.path)
//                   ? "bg-white/10"
//                   : "bg-white/5 group-hover:bg-white/10"
//               }`}
//             >
//               <item.icon className="h-4.5 w-4.5" />
//             </div>

//             {item.label}
//           </Link>
//         ))}
//       </nav>

//       {/* Logout */}
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
//       {/* Desktop Sidebar */}
//       <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-slate-200/60 lg:flex">
//         <SidebarContent />
//       </aside>

//       {/* Mobile Sidebar */}
//       {sidebarOpen && (
//         <div className="fixed inset-0 z-40 lg:hidden">
//           <div
//             className="absolute inset-0 bg-slate-900/50"
//             onClick={() => setSidebarOpen(false)}
//           />

//           <aside className="absolute left-0 top-0 bottom-0 z-50 w-72 shadow-2xl">
//             <SidebarContent />
//           </aside>
//         </div>
//       )}

//       {/* Main */}
//       <div className="flex min-h-screen flex-col lg:ml-72">
//         {/* Header */}
//         <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/90 backdrop-blur">
//           <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
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
//                 <h2 className="text-xl font-bold text-slate-900">
//                   {currentPage}
//                 </h2>
//               </div>
//             </div>

//             <div />
//           </div>
//         </header>

//         {/* Content */}
//         <main className="flex-1 p-4 sm:p-6 lg:p-8">
//           <div className="mx-auto max-w-7xl">{children}</div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

// import { ReactNode, useState } from "react";
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

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const isActive = (path: string) => location.pathname === path;

//   const currentPage =
//     navItems.find((n) => isActive(n.path))?.label || "Dashboard";

//   const SidebarContent = () => (
//     <div className="flex h-full flex-col bg-[#0f172a] text-white">
//       {/* Logo */}
//       <div className="border-b border-white/10 px-6 py-6">
//         <Link to="/dashboard" className="flex items-center gap-3">
//           <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#16a34a] shadow-lg">
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

//       {/* Admin ki matrame profile/access card */}
//       {isAdmin && (
//         <div className="px-4 pt-5">
//           <div
//             onClick={() => navigate("/profile")}
//             className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
//           >
//             <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
//               <Sparkles className="h-3.5 w-3.5" />
//               Admin Access
//             </div>

//             <div className="flex items-center gap-3">
//               <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-sm font-bold text-white">
//                 {user?.username?.[0]?.toUpperCase() || "U"}
//               </div>

//               <div className="min-w-0">
//                 <p className="truncate text-sm font-semibold text-white">
//                   {user?.username || "User"}
//                 </p>
//                 <p className="truncate text-xs text-slate-400">
//                   {user?.email || "No email"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Nav */}
//       <nav className="flex-1 space-y-2 px-4 py-6">
//         {navItems.map((item) => (
//           <Link
//             key={item.path}
//             to={item.path}
//             onClick={() => setSidebarOpen(false)}
//             className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
//               isActive(item.path)
//                 ? "bg-gradient-to-r from-[#16a34a] to-[#15803d] text-white shadow-lg"
//                 : "text-slate-300 hover:bg-white/5 hover:text-white"
//             }`}
//           >
//             <div
//               className={`flex h-9 w-9 items-center justify-center rounded-xl ${
//                 isActive(item.path)
//                   ? "bg-white/10"
//                   : "bg-white/5 group-hover:bg-white/10"
//               }`}
//             >
//               <item.icon className="h-4.5 w-4.5" />
//             </div>

//             {item.label}
//           </Link>
//         ))}
//       </nav>

//       {/* Logout */}
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
//       {/* Desktop Sidebar */}
//       <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-slate-200/60 lg:flex">
//         <SidebarContent />
//       </aside>

//       {/* Mobile Sidebar */}
//       {sidebarOpen && (
//         <div className="fixed inset-0 z-40 lg:hidden">
//           <div
//             className="absolute inset-0 bg-slate-900/50"
//             onClick={() => setSidebarOpen(false)}
//           />
//           <aside className="absolute left-0 top-0 bottom-0 z-50 w-72 shadow-2xl">
//             <SidebarContent />
//           </aside>
//         </div>
//       )}

//       {/* Main */}
//       <div className="flex min-h-screen flex-col lg:ml-72">
//         {/* Header */}
//         <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/90 backdrop-blur">
//           <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
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
//                 <h2 className="text-xl font-bold text-slate-900">
//                   {currentPage}
//                 </h2>
//               </div>
//             </div>

//             <div />
//           </div>
//         </header>

//         {/* Content */}
//         <main className="flex-1 p-4 sm:p-6 lg:p-8">
//           <div className="mx-auto max-w-7xl">{children}</div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;

// import { ReactNode, useState } from "react";
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
//   Sparkles,
//   PanelLeftClose,
// } from "lucide-react";
// import { LayoutTemplate } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const baseNavItems = [
//   { label: "Upload Resume", path: "/upload", icon: Upload },
//   { label: "My Upload History", path: "/history", icon: History },
//   { label: "Resume Templates", path: "/templates", icon: LayoutTemplate },
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

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const isActive = (path: string) => location.pathname === path;

//   const currentPage =
//     navItems.find((n) => isActive(n.path))?.label || "Dashboard";

//   const SidebarContent = () => (
//     <div className="flex h-full flex-col bg-[#0f172a] text-white">
//       {/* Logo */}
//       <div className="border-b border-white/10 px-6 py-6">
//         <Link to="/dashboard" className="flex items-center gap-3">
//           <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#16a34a] shadow-lg">
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

//       {/* Access/Profile Card - both Admin and Normal User */}
//       <div className="px-4 pt-5">
//         <div
//           onClick={() => navigate("/profile")}
//           className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
//         >
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

//       {/* Nav */}
//       <nav className="flex-1 space-y-2 px-4 py-6">
//         {navItems.map((item) => (
//           <Link
//             key={item.path}
//             to={item.path}
//             onClick={() => setSidebarOpen(false)}
//             className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
//               isActive(item.path)
//                 ? "bg-gradient-to-r from-[#16a34a] to-[#15803d] text-white shadow-lg"
//                 : "text-slate-300 hover:bg-white/5 hover:text-white"
//             }`}
//           >
//             <div
//               className={`flex h-9 w-9 items-center justify-center rounded-xl ${
//                 isActive(item.path)
//                   ? "bg-white/10"
//                   : "bg-white/5 group-hover:bg-white/10"
//               }`}
//             >
//               <item.icon className="h-4.5 w-4.5" />
//             </div>

//             {item.label}
//           </Link>
//         ))}
//       </nav>

//       {/* Logout */}
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
//       {/* Desktop Sidebar */}
//       <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-slate-200/60 lg:flex">
//         <SidebarContent />
//       </aside>

//       {/* Mobile Sidebar */}
//       {sidebarOpen && (
//         <div className="fixed inset-0 z-40 lg:hidden">
//           <div
//             className="absolute inset-0 bg-slate-900/50"
//             onClick={() => setSidebarOpen(false)}
//           />
//           <aside className="absolute left-0 top-0 bottom-0 z-50 w-72 shadow-2xl">
//             <SidebarContent />
//           </aside>
//         </div>
//       )}

//       {/* Main */}
//       <div className="flex min-h-screen flex-col lg:ml-72">
//         {/* Header */}
//         <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/90 backdrop-blur">
//           <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
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
//                 <h2 className="text-xl font-bold text-slate-900">
//                   {currentPage}
//                 </h2>
//               </div>
//             </div>

//             <div />
//           </div>
//         </header>

//         {/* Content */}
//         <main className="flex-1 p-4 sm:p-6 lg:p-8">
//           <div className="mx-auto max-w-7xl">{children}</div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
