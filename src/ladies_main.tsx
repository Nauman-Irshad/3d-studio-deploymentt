import React from "react";
import ReactDOM from "react-dom/client";
import { preloadBackgroundRemovalModel } from "./utils/backgroundRemoval";
import { LadiesTryOnPage } from "./routes";

preloadBackgroundRemovalModel();
import "./assets/styles/App.css";
import "./assets/styles/site-chrome.css";
import "./assets/styles/studio.css";
import "./assets/styles/ladies.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LadiesTryOnPage />
  </React.StrictMode>,
);
