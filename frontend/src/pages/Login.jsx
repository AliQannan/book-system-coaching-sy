// src/pages/Login.jsx
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/Context.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Clerk imports
import { SignIn, SignUp, SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";

function Login() {
  const navigate = useNavigate();
  const { setToken } = useContext(AppContext);
  const [state, setState] = useState("Sign Up"); // "Sign Up" or "Login"

  const { isLoaded, userId, getToken } = useAuth();

  useEffect(() => {
    if (!isLoaded) return; // Wait for Clerk to load
    if (userId) {
      (async () => {
        try {
          const tk = await getToken({ template: "default" }); // fetch token securely
          if (tk) {
            localStorage.setItem("token", tk);
            setToken(tk);
            toast.success("Signed in successfully!");
            navigate("/");
          } else {
            toast.error("Failed to retrieve authentication token.");
          }
        } catch (err) {
          console.error("Error fetching Clerk token:", err);
          toast.error("Authentication error occurred.");
        }
      })();
    }
  }, [isLoaded, userId, getToken, setToken, navigate]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="flex flex-col gap-4 p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-700 text-sm shadow-md bg-white">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p className="text-sm text-zinc-500">
          Please {state === "Sign Up" ? "sign up" : "log in"} to book an appointment.
        </p>

        <div className="w-full mt-4">
          <SignedOut>
            {state === "Sign Up" ? (
              <SignUp path="/sign-up" routing="path" signInUrl="/login" />
            ) : (
              <SignIn path="/sign-in" routing="path" signUpUrl="/login" />
            )}

            <div className="mt-4 text-center">
              {state === "Sign Up" ? (
                <p>
                  Already have an account?{" "}
                  <span
                    onClick={() => setState("Login")}
                    className="text-blue-600 underline cursor-pointer"
                  >
                    Login here
                  </span>
                </p>
              ) : (
                <p>
                  Don’t have an account?{" "}
                  <span
                    onClick={() => setState("Sign Up")}
                    className="text-blue-600 underline cursor-pointer"
                  >
                    Sign up
                  </span>
                </p>
              )}
            </div>
          </SignedOut>

          <SignedIn>
            <div className="p-4 text-center text-zinc-600">
              <p>Signing you in — redirecting…</p>
            </div>
          </SignedIn>
        </div>
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default Login;
