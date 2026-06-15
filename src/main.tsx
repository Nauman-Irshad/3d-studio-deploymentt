import React from "react";
import ReactDOM from "react-dom/client";
import { preloadBackgroundRemovalModel } from "./utils/backgroundRemoval";
import { App, CapturePage, getCaptureSessionId } from "./routes";

preloadBackgroundRemovalModel();
import "./assets/styles/App.css";
import "./assets/styles/site-chrome.css";
import "./assets/styles/studio.css";

const sessionId = getCaptureSessionId();
const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    {sessionId ? <CapturePage sessionId={sessionId} /> : <App />}
  </React.StrictMode>,
);
