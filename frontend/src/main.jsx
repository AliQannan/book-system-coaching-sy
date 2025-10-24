// index.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import AppContextProvider from "./context/Context.jsx";
import App from "./App.jsx";
import "./index.css";

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_ZmFzdC1mcm9nLTYyLmNsZXJrLmFjY291bnRzLmRldiQ";

if (!clerkPublishableKey) {
  throw new Error("Missing Clerk Publishable Key! Please set VITE_CLERK_PUBLISHABLE_KEY in your .env file");
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <BrowserRouter>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);
