// index.jsx
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/Context.jsx";

// Clerk
import { ClerkProvider } from "@clerk/clerk-react";

const clerkFrontendApi = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY; // set this in .env

createRoot(document.getElementById("root")).render(
  <ClerkProvider frontendApi={clerkFrontendApi}>
    <BrowserRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </ClerkProvider>
);
