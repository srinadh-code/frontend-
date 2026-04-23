import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import GoogleSignIn from "@/components/GoogleSignIn";

import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Eye,
  EyeOff,
  FileText,
  Lock,
  Sparkles,
  Trophy,
  User,
} from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const validate = () => {
    const e: Record<string, string> = {};
    if (!username.trim()) e.username = "Username or email is required";
    if (!password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!validate()) return;

  try {
    const res = await login(username, password);

// const isAdmin = res.is_admin ?? false;
const isAdmin = res.is_admin;
toast({
  title: "Login Successful",
  description: "Redirecting...",
});

// setTimeout(() => {
//   if (isAdmin) {
//     navigate("/dashboard", { replace: true });
//   } else {
//     navigate("/upload", { replace: true });
//   }
// }, 1000);
if (isAdmin) {
  navigate("/dashboard", { replace: true });
} else {
  navigate("/upload", { replace: true });
}

  } catch (err: any) {
    console.error("Login Error:", err);

    let message = "Invalid credentials";

    if (err.response?.data?.detail) {
      message = err.response.data.detail;
    }

    toast({
      title: "Login Failed",
      description: message,
    });
  }
};

  return (
    <div className="min-h-screen bg-[#f6f8f7] flex flex-col">
      <div className="flex-1 grid lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="relative hidden lg:flex overflow-hidden bg-gradient-to-br from-[#edf9f1] via-[#dcf5e7] to-[#f8fbf9]">
          <div className="absolute inset-0">
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#22c55e]/10 blur-3xl" />
            <div className="absolute top-32 left-10 h-32 w-32 rounded-full bg-white/40 blur-2xl" />
            <div className="absolute bottom-20 right-10 h-56 w-56 rounded-full bg-[#16a34a]/10 blur-3xl" />
          </div>

          <div className="relative z-10 flex h-full w-full flex-col justify-between px-10 py-10 xl:px-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#16a34a] text-white shadow-lg shadow-green-200">
                <FileText className="h-7 w-7" />
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
                Resume<span className="text-[#16a34a]">Pro</span>
              </h1>
            </div>

            {/* Main Content */}
            <div className="max-w-xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-[#16a34a] shadow-sm backdrop-blur">
                <Sparkles className="h-4 w-4" />
                <span className="text-lg font-semibold">Welcome Back!</span>
              </div>

              <h2 className="text-6xl font-extrabold leading-[1.05] text-slate-900">
                Ready to <br />
                <span className="text-[#16a34a]">Continue?</span>
              </h2>

              <p className="mt-6 max-w-lg text-2xl leading-relaxed text-slate-600">
                Sign in to access your dashboard and take the next step in your
                career journey.
              </p>

              <div className="mt-12 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-[#16a34a] shadow-md">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900">
                      Smart Resume Builder
                    </h3>
                    <p className="mt-1 text-xl text-slate-600">
                      Create ATS-friendly resumes
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-[#16a34a] shadow-md">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900">
                      Track Applications
                    </h3>
                    <p className="mt-1 text-xl text-slate-600">
                      Manage your job applications
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-[#16a34a] shadow-md">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900">
                      Career Growth
                    </h3>
                    <p className="mt-1 text-xl text-slate-600">
                      Get hired faster
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Illustration */}
            <div className="relative mt-10 h-[280px] w-full">
              <div className="absolute bottom-0 left-0 right-0 h-20 rounded-t-[2rem] bg-white/55 backdrop-blur-sm" />

              <div className="absolute bottom-20 left-6 h-40 w-6 rounded-full bg-[#2f855a] rotate-[25deg]" />
              <div className="absolute bottom-48 left-2 h-20 w-20 rounded-full border-[12px] border-[#2f855a] bg-[#3fa86a] shadow-lg" />
              <div className="absolute bottom-36 left-28 h-16 w-28 rounded-2xl bg-[#ffffff]/70 rotate-[-8deg] shadow" />
              <div className="absolute bottom-16 left-36 h-14 w-14 rounded bg-[#d9f99d] rotate-[4deg] shadow" />
              <div className="absolute bottom-28 left-52 h-12 w-12 rounded bg-[#fde68a] rotate-[-6deg] shadow" />

              <div className="absolute bottom-10 left-44 h-24 w-24 rounded-[2rem] bg-gradient-to-br from-[#8ddf79] to-[#3fa34d] shadow-xl" />
              <div className="absolute bottom-6 left-40 h-8 w-32 rounded-full bg-black/10 blur-md" />

              <div className="absolute bottom-10 left-72">
                <div className="h-24 w-24 rounded-t-[1.5rem] rounded-b-[0.8rem] bg-[#2f3e46] shadow-xl" />
                <div className="absolute bottom-5 left-5 text-center text-sm font-bold leading-4 text-white">
                  BUILD
                  <br />
                  YOUR
                  <br />
                  FUTURE
                </div>
              </div>

              <div className="absolute bottom-6 left-24 h-6 w-36 rounded-xl bg-white shadow-md" />
              <div className="absolute bottom-4 left-40 h-2 w-20 rounded-full bg-[#2f855a] rotate-[12deg]" />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex min-h-screen flex-col bg-[#f8f8f8]">
          {/* Top Nav */}
          <div className="flex items-center justify-between px-6 py-6 lg:px-10">
            <Link to="/" className="flex items-center gap-3 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#16a34a] text-white shadow-md">
                <FileText className="h-5 w-5" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">
                Resume<span className="text-[#16a34a]">Pro</span>
              </h1>
            </Link>

            <div className="ml-auto flex items-center gap-8 text-lg">
              <Link
                to="/login"
                className="border-b-2 border-[#16a34a] pb-1 font-semibold text-[#16a34a]"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="pb-1 font-medium text-slate-500 transition hover:text-slate-800"
              >
                Sign Up
              </Link>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-8 lg:px-10">
            <div className="w-full max-w-2xl rounded-[2rem] border border-slate-200/80 bg-white px-6 py-8 shadow-[0_10px_40px_rgba(15,23,42,0.06)] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
              <div className="mx-auto max-w-lg">
                {/* Card Header */}
                <div className="mb-8 text-center">
                  <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-[#dcfce7] text-[#16a34a]">
                    <Lock className="h-10 w-10" />
                  </div>
                  <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
                    Welcome Back!
                  </h2>
                  <p className="mt-3 text-xl text-slate-500">
                    Sign in to your account
                  </p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2.5">
                    <Label className="text-base font-semibold text-slate-800">
                      Email or Username
                    </Label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your email or username"
                        className="h-14 rounded-xl border-slate-200 pl-12 pr-4 text-base shadow-sm focus-visible:ring-[#16a34a]"
                      />
                    </div>
                    {errors.username && (
                      <p className="text-sm text-red-500">{errors.username}</p>
                    )}
                  </div>

                  <div className="space-y-2.5">
                    <Label className="text-base font-semibold text-slate-800">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="h-14 rounded-xl border-slate-200 pl-12 pr-14 text-base shadow-sm focus-visible:ring-[#16a34a]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-sm text-red-500">{errors.password}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-600">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                        className="h-4 w-4 rounded border-slate-300 text-[#16a34a] focus:ring-[#16a34a]"
                      />
                      <span className="font-medium">Remember me</span>
                    </label>

                    <Link
                      to="/forgot-password"
                      className="text-sm font-semibold text-[#16a34a] hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="h-14 w-full rounded-xl bg-[#16a34a] text-lg font-semibold text-white hover:bg-[#15803d]"
                  >
                    <span>Sign In</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-4 text-slate-400">
                      or continue with
                    </span>
                  </div>
                </div>

                {/* GOOGLE */}
                <div className="w-full">
                  <GoogleSignIn />
                </div>

                {/* Footer text */}
                <p className="mt-8 text-center text-base text-slate-600">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-semibold text-[#16a34a] hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>

                {/* Mobile extra badge */}
                <div className="mt-8 flex justify-center lg:hidden">
                  <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-[#16a34a]">
                    <BadgeCheck className="h-4 w-4" />
                    Secure access to your dashboard
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 px-4 py-5 text-center text-sm text-slate-500 sm:px-8">
            <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-6">
              <span>© 2024 ResumePro. All rights reserved.</span>
              <span className="hidden sm:inline">•</span>
              <span>Privacy Policy</span>
              <span className="hidden sm:inline">•</span>
              <span>Terms of Service</span>
              <span className="hidden sm:inline">•</span>
              <span>Help Center</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;