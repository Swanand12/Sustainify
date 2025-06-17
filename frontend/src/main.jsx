// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "../index.css";
import { AuthProvider } from "./context/authContext.jsx";
import { WalletProvider } from "./context/walletContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AuthProvider>
    <WalletProvider>
      <App />
    </WalletProvider>
  </AuthProvider>
  // </StrictMode>,
);
