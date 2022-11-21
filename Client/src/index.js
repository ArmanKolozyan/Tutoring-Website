import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthConfig } from "./context/PasswordContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthConfig>
      <App />
    </AuthConfig>
  </React.StrictMode>
);
