import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthConfig } from "./context/PasswordContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthConfig> {/* in this way the currentUser can be used in the entire application */}
      <App />
    </AuthConfig>
  </React.StrictMode>
);
