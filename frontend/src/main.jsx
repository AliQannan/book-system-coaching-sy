// index.jsx
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/Context.jsx";

// Clerk
import { ClerkProvider } from "@clerk/clerk-react";

const clerkFrontendApi = process.env.REACT_APP_CLERK_FRONTEND_API; // set this in .env

createRoot(document.getElementById("root")).render(
  <ClerkProvider frontendApi={clerkFrontendApi}>
    <BrowserRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </ClerkProvider>
);
