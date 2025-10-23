// src/pages/Login.jsx
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Context.jsx";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Clerk imports
import { SignIn, SignUp, SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";

function Login() {
  const navigate = useNavigate();
  const { token, setToken } = useContext(AppContext);

  // keep your previous UI toggle for Sign Up / Login
  const [state, setState] = useState("Sign Up"); // "Sign Up" or "Login"

  // Clerk auth helper
  const { isLoaded, userId, getToken } = useAuth();

  // When user signs in, Clerk will set userId; we then ask Clerk for a token
  useEffect(() => {
    if (!isLoaded) return;

    // if there's a Clerk session (userId present), get a token and set it in context/storage
    if (userId) {
      getToken()
        .then((tk) => {
          if (tk) {
            // Save token in localStorage and in the AppContext (so your existing code that uses `token` keeps working)
            localStorage.setItem("token", tk);
            setToken(tk);
            toast.success("Signed in successfully");
            navigate("/");
          } else {
            toast.error("Failed to obtain auth token from Clerk");
          }
        })
        .catch((err) => {
          console.error("Error getting Clerk token:", err);
          toast.error("Authentication error");
        });
    }
  }, [isLoaded, userId, getToken, setToken, navigate]);

  // If you still want to support the old email/password UI temporarily,
  // keep that code — but because you removed passwords server-side, prefer using Clerk.

  return (
    <div className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg ">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>

        <p className="text-sm text-zinc-500">
          Please {state === "Sign Up" ? "sign up" : "login"} to book appointment
        </p>

        <div className="w-full mt-4">
          {/* If signed out, show the Clerk SignUp or SignIn component.
              When sign in completes, the SignedIn branch will run and useEffect will handle token retrieval. */}
          <SignedOut>
            {state === "Sign Up" ? (
              <div>
                {/* embed Clerk's SignUp UI */}
                <SignUp path="/sign-up" routing="path" />
              </div>
            ) : (
              <div>
                {/* embed Clerk's SignIn UI */}
                <SignIn path="/sign-in" routing="path" />
              </div>
            )}

            <div className="mt-4">
              {state === "Sign Up" ? (
                <p>
                  Already have an account?{" "}
                  <span
                    onClick={() => setState("Login")}
                    className="text-primary underline cursor-pointer"
                  >
                    Login here
                  </span>
                </p>
              ) : (
                <p>
                  Create a new account?{" "}
                  <span
                    onClick={() => setState("Sign Up")}
                    className="text-primary underline cursor-pointer"
                  >
                    click here
                  </span>
                </p>
              )}
            </div>
          </SignedOut>

          {/* While user is signed in, show a friendly message while token is fetched. */}
          <SignedIn>
            <div className="p-4">
              <p>Signing you in — redirecting…</p>
            </div>
          </SignedIn>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Login;
