import React from "react";
import ReactDOM from "react-dom/client";
import { StudioShell } from "./routes";
import "./assets/styles/App.css";
import "./assets/styles/site-chrome.css";
import "./assets/styles/studio.css";
import "./assets/styles/studio-shell.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StudioShell />
  </React.StrictMode>,
);
