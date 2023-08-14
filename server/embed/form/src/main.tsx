import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.querySelector("[data-form-id]")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);