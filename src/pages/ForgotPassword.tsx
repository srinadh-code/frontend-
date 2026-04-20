
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { KeyRound, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

type Step = "email" | "otp" | "reset" | "done";

const ForgotPassword = () => {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const API_BASE = "http://127.0.0.1:8000/api/";

  // STEP 1: Send OTP email
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}forgot-password/`, {
        email: email,
      });

      toast({
        title: "OTP Sent",
        description: res.data.message || "Check your email for the verification code.",
      });

      setStep("otp");
    } catch (err: any) {
      console.error("Forgot Password Error:", err.response?.data || err.message);

      setError(err.response?.data?.error || "Failed to send OTP");
      toast({
        title: "Error",
        description: err.response?.data?.error || "Failed to send OTP",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Verify OTP only on frontend, move to reset screen
  // const handleOtpSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (otp.length < 6) {
  //     setError("Please enter the full OTP");
  //     return;
  //   }

  //   setError("");
  //   setStep("reset");
  // };const handleOtpSubmit = async (e: React.FormEvent) => {
  const handleOtpSubmit = async(e:React.FormEvent) => {
  e.preventDefault();

  if (otp.length < 6) {
    setError("Please enter the full OTP");
    return;
  }

  setError("");

  try {
    await axios.post("http://127.0.0.1:8000/api/verify-otp/", {
      email: email,
      otp: otp,
    });

    setStep("reset");

  } catch (err: any) {
    console.error(err.response?.data || err.message);

    setError(err.response?.data?.error || "Invalid OTP");

    toast({
      title: "Invalid OTP",
      description: err.response?.data?.error || "Please try again",
      variant: "destructive",
    });
  }
};

  //step 3:Reset Password
  
const handleResetSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Basic frontend validations
  if (newPassword.length < 8) {
    setError("Password must be at least 8 characters");
    return;
  }

  if (newPassword !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  setError("");

  try {
    const res = await axios.post("http://127.0.0.1:8000/api/reset-password/", {
      email: email,
      otp: otp,
      new_password: newPassword,
    });

    toast({
      title: "Password Reset Successful",
      description: res.data.msg || "You can now log in with your new password.",
    });

    setStep("done");

  } catch (err: any) {
    console.error("Reset Password Error:", err.response?.data || err.message);

    setError(err.response?.data?.error || "Password reset failed");

    toast({
      title: "Reset Failed",
      description: err.response?.data?.error || "Something went wrong",
      variant: "destructive",
    });
  }
};

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
            {step === "done" ? (
              <CheckCircle2 className="w-7 h-7 text-success" />
            ) : (
              <KeyRound className="w-7 h-7 text-primary" />
            )}
          </div>

          <h1 className="text-2xl font-bold font-heading text-foreground">
            {step === "email" && "Forgot Password"}
            {step === "otp" && "Verify OTP"}
            {step === "reset" && "Reset Password"}
            {step === "done" && "All Done!"}
          </h1>

          <p className="text-muted-foreground mt-1">
            {step === "email" && "Enter your email to receive a code"}
            {step === "otp" && `We sent a code to ${email}`}
            {step === "reset" && "Choose a new password"}
            {step === "done" && "Your password has been reset"}
          </p>
        </div>

        {/* STEP 1: EMAIL */}
        {step === "email" && (
          <form onSubmit={handleEmailSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>

            <Button type="submit" className="w-full h-11" disabled={loading}>
              {loading ? "Sending..." : "Send OTP"}
            </Button>
          </form>
        )}

        {/* STEP 2: OTP */}
        {step === "otp" && (
          <form onSubmit={handleOtpSubmit} className="space-y-5">
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                <InputOTPGroup>
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            {error && <p className="text-sm text-destructive text-center">{error}</p>}

            <Button type="submit" className="w-full h-11">
              Verify
            </Button>
          </form>
        )}

        {/* STEP 3: RESET PASSWORD */}
        {step === "reset" && (
          <form onSubmit={handleResetSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Min 8 characters"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="w-full h-11" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        )}

        {/* STEP 4: DONE */}
        {step === "done" && (
          <Link to="/login">
            <Button className="w-full h-11">Back to Login</Button>
          </Link>
        )}

        {step !== "done" && (
          <p className="text-center text-sm text-muted-foreground mt-6">
            <Link
              to="/login"
              className="text-primary font-medium hover:underline inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to login
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;