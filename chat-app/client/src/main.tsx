import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./providers/auth.provider.tsx";
import { ChatProvider } from "./providers/chat.provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </AuthProvider>
      <ToastContainer />
    </BrowserRouter>
  </StrictMode>
);
