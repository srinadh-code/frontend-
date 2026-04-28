





import { useCallback } from "react";
import API from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, config: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export const useGoogleAuth = () => {
  const { login } = useAuth();
  const { toast } = useToast();

  const handleGoogleSignIn = useCallback(async (credentialResponse: any) => {
    try {
      const idToken = credentialResponse.credential;

      if (!idToken) {
        toast({ title: "Error", description: "Failed to get Google token" });
        return;
      }

      //  FIXED HERE (token instead of id_token)
      const response = await API.post("google-auth/", {
        token: idToken,
      });

      if (response.data.access && response.data.refresh) {
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);

        const userData = {
          username: response.data.username,
          email: response.data.email,
        };

        localStorage.setItem("user", JSON.stringify(userData));

        toast({
          title: "Success",
          description: `Welcome ${response.data.username}!`,
        });

        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 500);
      }
    } catch (error: any) {
      console.error("Google auth error:", error);
      toast({
        title: "Google Sign-In Failed",
        description:
          error.response?.data?.error || "Unable to sign in with Google",
      });
    }
  }, [login, toast]);

  const initializeGoogleSignIn = useCallback(
    (elementId: string) => {
      if (!window.google) {
        console.error("Google Sign-In SDK not loaded");
        return;
      }

      window.google.accounts.id.initialize({
        client_id:
          "1010396436283-gjnrp2m8gk77j53bc2mg35hf5k0999k4.apps.googleusercontent.com",
        callback: handleGoogleSignIn,
      });

      const element = document.getElementById(elementId);
      if (element) {
        window.google.accounts.id.renderButton(element, {
          theme: "outline",
          size: "large",
          width: "100%",
        });
      }
    },
    [handleGoogleSignIn]
  );

  return {
    initializeGoogleSignIn,
  };
};