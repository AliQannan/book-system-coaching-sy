// index.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/Context.jsx";
import App from "./App.jsx";
import "./index.css";


if (!clerkPublishableKey) {
  throw new Error("Missing Clerk Publishable Key! Please set VITE_CLERK_PUBLISHABLE_KEY in your .env file");
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>

      <BrowserRouter>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </BrowserRouter>

  </React.StrictMode>
);
